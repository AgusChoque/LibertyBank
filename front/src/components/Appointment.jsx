import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useAxiosAppointment from "../hooks/useAxiosAppointment";

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
        <div>
            <div>
                <p>{status}</p>
            </div>
            <div>
                <p>{date}</p>
                <p>{time}</p>
                <p>{reason}</p>
            </div>
            <div>
                {status === "active" 
                ? <button onClick={handleCancel} >Cancel</button> 
                : <></>}
            </div>
        </div>
    );
};

export default Appointment;