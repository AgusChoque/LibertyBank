import MyLoginForm from "../components/MyLoginForm";
import { container, centered, highlight } from "../styles/RegisterAndLogin.module.css";
import { Link } from "react-router-dom";

const Login = () => {
    return(
        <div className={container}>
            <div className={centered}>
            <h1>Liberty Bank</h1>
            <p>Access to the platform.</p>
            <MyLoginForm />
            <p>Don't have an account yet? <Link to="/register" className={highlight} >Register</Link></p>
            </div>
        </div>
    );
};

export default Login;