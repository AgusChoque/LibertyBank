import { useState, useEffect } from 'react';
import { getAppointments, getAppointmentById, scheduleAppointment, cancelAppointment, getByUserId } from '../services/apiAppointmentService';

const useAxiosAppointment = (endpoint, toSend = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            switch(endpoint) {
                case "appointments":
                    try {
                        const appointments = await getAppointments();
                        setData(appointments);
                    } catch (error) {
                        setError(error);
                    };
                    break;
                case "appointment id":
                    try {
                        const appointment = await getAppointmentById(toSend);
                        setData(appointment);
                    } catch (error) {
                        setError(error);
                    };
                    break;
                case "schedule":
                    try {
                        const schedule = await scheduleAppointment(toSend);
                        setData(schedule);
                    } catch (error) {
                        setError(error);
                    };
                    break;
                case "cancel":
                    try {
                        const cancel = await cancelAppointment(toSend);
                        setData(cancel);
                    } catch (error) {
                        setError(error);
                    };
                    break;
                case "appointments by user":
                    try {
                        const appointments = await getByUserId(toSend);
                        setData(appointments);
                    } catch (error) {
                        setError(error);
                    };
            };
        };

        fetchData();
    }, [endpoint,toSend]);
    return { data, error };
};

export default useAxiosAppointment;