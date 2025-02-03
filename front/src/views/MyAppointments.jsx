import { Suspense, useContext, useEffect } from "react";
import { myList, firstRow, status, content } from "../styles/myAppointments.module.css";
import LazyAppointmentsLoader from "../components/LazyAppointmentsLoader";
import { UserContext } from "../contexts/UserContext";
import useAxiosAppointment from "../hooks/useAxiosAppointment";

const MyAppointments = () => {
    const {user, setUserAppointments} = useContext(UserContext);
    const { data } = useAxiosAppointment("appointments by user", user.id ?? 0);

    useEffect(() => {
        if(data) setUserAppointments(data)
    }, [data])

    return (
        <div className="container">
            <h2>My Appointments</h2>
            <ul className={firstRow}>
                <li className={status}>Status</li>
                <li className={content}>Date</li>
                <li className={content}>Time</li>
                <li className={status}>Cancel</li>
            </ul>
            <div className={myList}>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyAppointmentsLoader />
                </Suspense>
            </div>
        </div>
    );
};

export default MyAppointments;