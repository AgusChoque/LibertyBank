import { Formik, Field, Form, ErrorMessage } from "formik";
import validateRegister from "../helpers/validateRegister";
import axios from "axios";
import { myForm, myField, myInput, myButton, myError, myLabel } from "../styles/MyForm.module.css";
import useAlert from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";

const MyRegisterForm = () => {
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const handleOnSubmit = async ({name, email, birthdate, nDni, username, password}) => {
        try {
            await axios.post("http://localhost:3000/users/register", {name, email, birthdate, nDni, credentials: {username, password}});
            showAlert("Done", "User registered succesfully", "success");
            navigate("/login");
        } catch (err) {
            showAlert("Error", err.response.data.error, "error");
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
                    <div className={myError}>
                        <ErrorMessage name="name" />
                    </div>
                </div>

                <div className={myField}>
                    <label className={myLabel}>Email</label>
                    <Field type="email" name="email" className={myInput} />
                    <div className={myError}>
                        <ErrorMessage name="email" />
                    </div>
                </div>

                <div className={myField}>
                    <label className={myLabel}>Birthdate</label>
                    <Field type="date" name="birthdate" className={myInput} />
                    <div className={myError}>
                        <ErrorMessage name="birthdate" />
                    </div>
                </div>

                <div className={myField}>
                    <label className={myLabel}>DNI</label>
                    <Field type="number" name="nDni" className={myInput} />
                    <div className={myError}>
                        <ErrorMessage name="nDni" />
                    </div>
                </div>

                <div className={myField}>
                    <label className={myLabel}>Username</label>
                    <Field type="text" name="username" className={myInput} />
                    <div className={myError}>
                        <ErrorMessage name="username" />
                    </div>
                </div>

                <div className={myField}>
                    <label className={myLabel}>Password</label>
                    <Field type="password" name="password" className={myInput} />
                    <div className={myError}>
                        <ErrorMessage name="password" />
                    </div>
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