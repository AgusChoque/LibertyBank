import AppointmentDto from "../dto/AppointmentDto";
import { IAppointment, appointmentStatus } from "../interfaces/IAppointment";

//Array of IAppointment to use as "preload".
const appointments: IAppointment[] = [];

const appointment1: IAppointment = {
    id: 1,
    date: new Date("2025-02-10"),
    time: "09:30",
    userId: 1,
    status: appointmentStatus.ACTIVE
};

const appointment2: IAppointment = {
    id: 2,
    date: new Date("2025-03-05"),
    time: "14:00",
    userId:2,
    status: appointmentStatus.ACTIVE
};

appointments.push(appointment1);
appointments.push(appointment2);

//Return all appointments.
export const getAppointmentsService = async (): Promise<IAppointment[]> => {
    return appointments;
};

//Return appointment by id.
export const getAppointmentByIdService = async (id: number): Promise<IAppointment> => {
    const appointmentFinded: IAppointment | undefined = appointments.find((appoint:IAppointment):IAppointment | undefined => {
        if (appoint.id === id) return appoint;
    })

    if (appointmentFinded === undefined) throw Error;
    else return appointmentFinded;
}

//Create appointment and return it.
let id = 3;

export const setAppointmentService = async ({date, time, userId}: AppointmentDto): Promise<IAppointment> => {
    const newAppointment:IAppointment = {
        id,
        date,
        time,
        userId,
        status: appointmentStatus.ACTIVE
    };

    appointments.push(newAppointment);
    id++
    return newAppointment;
};

//Get an appointment by id and change it status to "cancelled".
export const cancelAppointmentService = async (id: number): Promise<IAppointment> => {
    const i = appointments.findIndex(appoint => appoint.id == id);
    appointments[i].status = appointmentStatus.CANCELLED;
    return appointments[i];
};