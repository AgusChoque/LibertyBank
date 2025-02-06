import MyRegisterForm from "../components/MyRegisterForm";
import { Link } from "react-router-dom";
import { container, centered, highlight } from "../styles/Register.module.css";

const Register = () => {
    return(
        <div className={container}>
            <div className={centered}>
                <h1>Liberty Bank</h1>
                <p>Create your account to access the platform.</p>
                <MyRegisterForm />
                <p>Do you already have an account? <Link to="/login" className={highlight} >Log in</Link></p>
            </div>
        </div>
    )
};

export default Register;