import { Formik, Field, Form, ErrorMessage } from "formik";
import validateRegister from "../helpers/validateRegister";
import axios from "axios";
import { myForm, myField, myInput, myButton, custom, myLabel } from "../styles/MyForm.module.css";

const MyRegisterForm = () => {
    const handleOnSubmit = async ({name, email, birthdate, nDni, username, password}) => {
        try {
            await axios.post("http://localhost:3000/users/register", {name, email, birthdate, nDni, credentials: {username, password}});
            alert("User registered succesfully.")
        } catch (err) {
            alert("Error: "+ err.response.data.error);
        };
    };

    return(
        <Formik
        initialValues={{name:"", email:"", birthdate:"", nDni:"", username:"", password:""}}
        validate={validateRegister}
        onSubmit={handleOnSubmit} >
            {({values}) => (
            <Form className={myForm}>
                <div className={myField}>
                    <label className={myLabel}>Name</label>
                    <Field type="text" name="name" className={myInput} />
                    <ErrorMessage name="name" className={custom} />
                </div>

                <div className={myField}>
                    <label className={myLabel}>Email</label>
                    <Field type="email" name="email" className={myInput} />
                    <ErrorMessage name="email" className={custom} />
                </div>

                <div className={myField}>
                    <label className={myLabel}>Birthdate</label>
                    <Field type="date" name="birthdate" className={myInput} />
                    <ErrorMessage name="birthdate" className={custom} />
                </div>

                <div className={myField}>
                    <label className={myLabel}>DNI</label>
                    <Field type="number" name="nDni" className={myInput} />
                    <ErrorMessage name="nDni" className={custom} />
                </div>

                <div className={myField}>
                    <label className={myLabel}>Username</label>
                    <Field type="text" name="username" className={myInput} />
                    <ErrorMessage name="username" className={custom} />
                </div>

                <div className={myField}>
                    <label className={myLabel}>Password</label>
                    <Field type="password" name="password" className={myInput} />
                    <ErrorMessage name="password" className={custom} />
                </div>

                <button type="submit" className={myButton} disabled={ !values.name || !values.email || !values.birthdate || !values.nDni || !values.username || !values.password } >
                    Register account
                </button> 

            </Form>
            )}
        </Formik>
    )
};

export default MyRegisterForm;