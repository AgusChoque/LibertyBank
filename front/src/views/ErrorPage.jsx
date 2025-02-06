import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { container } from "../styles/ErrorPage.module.css";

const ErrorPage = () => {
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(5);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountDown((prevCountdown) => prevCountdown - 1);
        }, 1000);
      
        setTimeout(() => {
            clearInterval(countdownInterval);
            navigate("/");
        }, 5000);
    
        return () => clearInterval(countdownInterval);
    }, [navigate])

    return (
        <div className={container}>
            <h1>Page Not Found</h1>
            <p>Redirecting to home in {countDown} seconds ...</p>
        </div>
    );
};

export default ErrorPage;