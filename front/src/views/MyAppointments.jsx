import { Suspense, useContext, useEffect, useState } from "react";
import { myList, firstRow, status, content } from "../styles/myAppointments.module.css";
import LazyAppointmentsLoader from "../components/LazyAppointmentsLoader";
import { UserContext } from "../contexts/UserContext";
import useAxiosAppointment from "../hooks/useAxiosAppointment";
import Schedule from "../components/Schedule";

const MyAppointments = () => {
    const {user, setUserAppointments, setRefetchAppointments} = useContext(UserContext);
    const { data, refetch } = useAxiosAppointment("appointments by user", user.id ?? 0);
    const [ showForm, setShowForm ] = useState(false);

    const handleOnClick = () => {
        setShowForm(true);
    };

    useEffect(() => {
        if(data) setUserAppointments(data)
    }, [data]);

    useEffect(() => {
        setRefetchAppointments(() => refetch);
    }, []);

    return (
        <div className="container">
            <h2>My Appointments</h2>
            <button type="buton" onClick={handleOnClick} >+ Schedule appointment</button>
            <ul className={firstRow}>
                <li className={status}>Status</li>
                <li className={content}>Date</li>
                <li className={content}>Time</li>
                <li className={status}>Action</li>
            </ul>
            <div className={myList}>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyAppointmentsLoader />
                </Suspense>
                {
                    showForm
                    ? <Schedule setShowForm={setShowForm} />
                    : <></>
                }
            </div>
        </div>
    );
};

export default MyAppointments;