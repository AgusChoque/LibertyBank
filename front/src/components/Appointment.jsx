import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useAxiosAppointment from "../hooks/useAxiosAppointment";
import { myAppointment, small, medium, large, borderBottom, active, cancelled, myButon } from "../styles/Appointment.module.css";
import useAlert from "../hooks/useAlert";

const Appointment = ({id, date, time, reason, status}) => {
    const { refetchAppointments } = useContext(UserContext);
    const { refetch } = useAxiosAppointment("cancel", 0);
    const { showAlert } = useAlert();
    const now = new Date();
    const appointDate = new Date(date);
    const [hour, min] = time.split(":").map(Number);
    const dateLimit = new Date(appointDate.getFullYear(), appointDate.getMonth(), appointDate.getDate() - 1, hour, min);

    const handleCancel = async () => {
        try {
            await refetch(id)
            showAlert("Done", "Appointment cancelled successfully", "success")
            refetchAppointments();
        } catch (err) {
            showAlert("Error", err.response.data.error, "error");
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
                ? <button onClick={handleCancel} className={myButon} disabled={ dateLimit < now ? false : true } >Cancel</button> 
                : <></>}
            </div>
        </div>
        <div className={borderBottom}></div>
        </>
    );
};

export default Appointment;