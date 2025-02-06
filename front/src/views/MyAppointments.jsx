import { Suspense, useContext, useEffect, useState } from "react";
import { container, myIntro, myList, myAppointments, small, medium, large, subtitle, myButton } from "../styles/myAppointments.module.css";
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
        <div className={container}>
            <div className={myIntro}>
                <h2 className={subtitle}>My Appointments</h2>
                <button type="buton" onClick={handleOnClick} className={myButton} >+ Schedule appointment</button>
            </div>
            <ul className={myList}>
                <li className={small}>Status</li>
                <li className={medium}>Date</li>
                <li className={medium}>Time</li>
                <li className={large}>Subject</li>
                <li className={medium}>Action</li>
            </ul>
            <div className={myAppointments}>
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