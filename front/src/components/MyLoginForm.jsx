import { Form, Formik, Field, ErrorMessage } from "formik";
import validateLogin from "../helpers/validateLogin";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const MyLoginForm = () => {
    const navigate = useNavigate();

    const handleOnSubmit = async (values) => {
        try {
            const res = await axios.post("http://localhost:3000/users/login", values);
            res.data.login ? alert("User loged succesfully.") : alert("User not found.");
            navigate("/")
        } catch (err) {
            alert("Error: "+ err.response.data.error);
        }
        
    };

    return (
        <Formik
            initialValues={{username:"", password:""}}
            validate={validateLogin}
            onSubmit={handleOnSubmit} >
            <Form>
                <label>Username</label>
                <Field type = "text" name = "username" placeholder = "" />
                <ErrorMessage name="username" />

                <label>Password</label>
                <Field type = "password" name = "password" placeholder = "" />
                <ErrorMessage name="password" />

                <button type="submit" >Submit</button>

            </Form>
        </Formik>
    );
};

export default MyLoginForm;