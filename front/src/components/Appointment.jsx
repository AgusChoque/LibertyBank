import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useAxiosAppointment from "../hooks/useAxiosAppointment";
import { myAppointment, small, medium, large, borderBottom, active, cancelled, myButon } from "../styles/Appointment.module.css";

const Appointment = ({id, date, time, reason, status}) => {
    const { refetchAppointments } = useContext(UserContext);
    const { refetch } = useAxiosAppointment("cancel", 0);

    const handleCancel = async () => {
        try {
            await refetch(id)
            refetchAppointments();
        } catch (error) {
            console.log(error);
        };
    };

    return(
        <>
        <div className={myAppointment}>
            <div className={small}>
                <div className={status === "active" ? active : cancelled}></div>
            </div>
            <p className={medium}>{date}</p>
            <p className={medium}>{time}</p>
            <p className={large}>{reason}</p>
            <div className={medium}>
                {status === "active" 
                ? <button onClick={handleCancel} className={myButon} >Cancel</button> 
                : <></>}
            </div>
        </div>
        <div className={borderBottom}></div>
        </>
    );
};

export default Appointment;