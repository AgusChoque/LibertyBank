import { useContext, useEffect } from "react";
import Appointment from "../components/Appointment";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const LazyAppointmentsLoader = () => {
    const { user, userAppointments } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) navigate("/");
    }, [user.id]);

    return (
        <>
        {
            !userAppointments.length ? (<p>There are no appointments yet.</p>) :
            (userAppointments.map((appointment)=>{
                return <Appointment
                key={appointment.id}
                id={appointment.id}
                date={appointment.date}
                time={appointment.time}
                reason={appointment.reason}
                status={appointment.status} />
            }))
        }
        </>
    )
};

export default LazyAppointmentsLoader;