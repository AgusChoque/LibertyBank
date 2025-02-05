import { useState, useEffect } from 'react';
import { getAppointments, getAppointmentById, scheduleAppointment, cancelAppointment, getByUserId } from '../services/apiAppointmentService';

const useAxiosAppointment = (endpoint, initialToSend = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [ toSend ] = useState(initialToSend);

    const fetchData = async (customToSend = toSend) => {
        if (!customToSend && ["appointment id", "schedule", "cancel", "appointments by user"].includes(endpoint)) return;
        try {
            let result;
            switch (endpoint) {
                case "appointments":
                    result = await getAppointments();
                    break;
                case "appointment id":
                    result = await getAppointmentById(customToSend);
                    break;
                case "schedule":
                    result = await scheduleAppointment(customToSend);
                    break;
                case "cancel":
                    result = await cancelAppointment(customToSend);
                    break;
                case "appointments by user":
                    result = await getByUserId(customToSend);
                    break;
                default:
                    throw new Error("Invalid Endpoint");
            };
            setData(result);
        } catch (error) {
            setError(error);
        };
    };

    useEffect(() => {
        if (endpoint === "appointments" || toSend !== null) fetchData();
    }, [endpoint,toSend]);
    
    return { data, error, refetch: async (newToSend) => {
        await fetchData(newToSend);
    } };
};

export default useAxiosAppointment;