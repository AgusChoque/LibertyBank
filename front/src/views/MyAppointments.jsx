import { useState } from "react";
import myAppointments from "../helpers/myAppointments";
import Appointment from "../components/Appointment";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState(myAppointments)

    return (
        <div>
            <h1>My Appointments</h1>
            <div>
                {appointments.map((appointment)=>{
                    return <Appointment
                    id={appointment.id}
                    date={appointment.date}
                    time={appointment.time}
                    status={appointment.status} />
                })
                }
            </div>
        </div>
    );
};

export default MyAppointments;