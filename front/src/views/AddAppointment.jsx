import { useContext, useEffect } from "react";
import {UserContext} from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const AddAppointment = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) navigate("/");
    }, [])

    return (
        <>
        
        </>
    );
};

export default AddAppointment;