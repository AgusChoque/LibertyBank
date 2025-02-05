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
    
    const actives = userAppointments.filter(appointment => {
        if (appointment.status === "active") return appointment
    });

    return (
        <>
        {
            !actives.length ? (<p>There are no actives appointments yet, try scheduling one.</p>) :
            (actives.map((appointment)=>{
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