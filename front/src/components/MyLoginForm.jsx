import { Form, Formik, Field, ErrorMessage } from "formik";
import validateLogin from "../helpers/validateLogin";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const MyLoginForm = () => {
    const navigate = useNavigate();

    const {setUser} = useContext(UserContext);

    const handleOnSubmit = async (values) => {
        try {
            const res = await axios.post("http://localhost:3000/users/login", values);
            res.data.login ? alert("User loged succesfully.") : alert("User not found.");
            setUser(res.data.user);
            navigate("/");
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