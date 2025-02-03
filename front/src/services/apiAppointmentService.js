import apiService from "./apiService";

export const getAppointments = async () => {
    try {
        const response = await apiService.get("/appointments");
        return response.data.data;
    } catch (error) {
        throw Error(`Error requesting appointments: ${error.response.data.error}`);
    }
};

export const getAppointmentById = async (id) => {
    try {
        const response = await apiService.get(`/appointments/${id}`);
        return response.data.data;
    } catch (error) {
        throw Error(`Error requesting the appointment: ${error.response.data.error}`);
    };
};

export const scheduleAppointment = async (appointment) => {
    try {
        const response = await apiService.post("/appointments/schedule", appointment);
        return response.data.data;
    } catch (error) {
        throw Error(`Error scheduling the appointment: ${error.response.data.error}`);
    };
};

export const cancelAppointment = async (id) => {
    try {
        const response = await apiService.put(`/appointments/cancel/${id}`);
        return response.data.data;
    } catch (error) {
        throw Error(`Error canceling the appointment: ${error.response.data.error}`);
    }
}

export const getByUserId = async (id) => {
    try {
        const response = await apiService.get(`/appointments/user/${id}`);
        return response.data.data;
    } catch (error) {
        throw Error(`Error trying to get appointments: ${error.response.data.error}`)
    }
}