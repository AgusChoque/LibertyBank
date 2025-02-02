import useAxiosAppointment from "../hooks/useAxiosAppointment.js";
import Appointment from "../components/Appointment";

const LazyAppointmentsLoader = () => {
    const { data, error } = useAxiosAppointment("appointments");

    return (
        <>
        {
            error ? (<h3>{error}</h3>) :
            (data?.map((appointment)=>{
                return <Appointment
                key={appointment.id}
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