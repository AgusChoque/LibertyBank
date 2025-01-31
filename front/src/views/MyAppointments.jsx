import { useEffect, useState } from "react";
import { myList, firstRow, status, data } from "../styles/myAppointments.module.css";
import Appointment from "../components/Appointment";
import axios from "axios";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/appointments")
        .then((res) => setAppointments([...res.data.data]))
    }, [])

    return (
        <div className="container">
            <h2>My Appointments</h2>
            <ul className={firstRow}>
                <li className={status}>Status</li>
                <li className={data}>Date</li>
                <li className={data}>Time</li>
                <li className={status}>Cancel</li>
            </ul>
            <div className={myList}>
                {appointments?.map((appointment)=>{
                    return <Appointment
                    key={appointment.id}
                    date={appointment.date}
                    time={appointment.time}
                    reason={appointment.reason}
                    status={appointment.status} />
                })
                }
            </div>
        </div>
    );
};

export default MyAppointments;