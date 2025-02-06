import { Form, Formik, Field, ErrorMessage } from "formik";
import validateLogin from "../helpers/validateLogin";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { myForm, myField, myInput, myButton, myError } from "../styles/MyForm.module.css";
import useAlert from "../hooks/useAlert";

const MyLoginForm = () => {
    const navigate = useNavigate();
    const {showAlert } = useAlert();
    const {setUser} = useContext(UserContext);

    const handleOnSubmit = async (values) => {
        try {
            const res = await axios.post("http://localhost:3000/users/login", values);
            res.data.login && showAlert("Done", "User loged succesfully", "success");
            setUser(res.data.user);
            navigate("/");
        } catch (err) {
            showAlert("Error", err.response.data.error, "error");
        }
        
    };

    return (
        <Formik
            initialValues={{username:"", password:""}}
            validate={validateLogin}
            onSubmit={handleOnSubmit} >
        {({values}) => (
            <Form className={myForm}>
                <div className={myField}>
                    <Field type = "text" name = "username" placeholder = "Username" className={myInput} />
                    <div className={myError}>
                        <ErrorMessage name="username" />
                    </div>
                </div>

                <div className={myField}>
                    <Field type = "password" name = "password" placeholder = "Password" className={myInput} />
                    <div className={myError}>
                        <ErrorMessage name="password" />
                    </div>
                </div>

                <button type="submit" className={myButton} disabled={ !values.username || !values.password } >
                    Log in
                </button>

            </Form>
        )}
        </Formik>
    );
};

export default MyLoginForm;