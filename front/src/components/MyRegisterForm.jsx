import { Formik, Field, Form, ErrorMessage } from "formik";
import validateRegister from "../helpers/validateRegister";
import axios from "axios";

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
            <Form>
                <label>Name</label>
                <Field type="text" name="name" placeholder="" />
                <ErrorMessage name="name" />

                <label>Email</label>
                <Field type="email" name="email" placeholder="" />
                <ErrorMessage name="email" />

                <label>Birthdate</label>
                <Field type="date" name="birthdate" placeholder="" />
                <ErrorMessage name="birthdate" />

                <label>DNI</label>
                <Field type="number" name="nDni" placeholder="" />
                <ErrorMessage name="nDni" />

                <label>Username</label>
                <Field type="text" name="username" placeholder="" />
                <ErrorMessage name="username" />

                <label>Password</label>
                <Field type="password" name="password" placeholder="" />
                <ErrorMessage name="password" />

                <button type="submit">Submit</button>

            </Form>
        </Formik>
    )
};

export default MyRegisterForm;