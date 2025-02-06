import { useContext, useEffect } from "react";
import Appointment from "../components/Appointment";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { noAppoint } from "../styles/LazyAppointmentsLoader.module.css";

const LazyAppointmentsLoader = ({status}) => {
    const { user, userAppointments } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) navigate("/");
    }, [user.id]);
    
    const appointments = userAppointments.filter(appointment => {
        if (appointment.status === status) return appointment;
    });

    return (
        <>
        {
            !appointments.length ? (<p className={noAppoint}>There are no appointments yet, try scheduling one.</p>) :
            (appointments.map((appointment)=>{
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