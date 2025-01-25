import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment, appointmentStatus } from "../entities/Appointment";

//Return all appointments.
export const getAppointmentsService = async (): Promise<Appointment[]> => {
    const appointments: Appointment[] = await AppointmentRepository.find({
        relations: {
            user: true,
        },
    });
    return appointments;
};

//Return appointment by id.
export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const appointment: Appointment = await AppointmentRepository.findById(id);
    return appointment;
};

//Create appointment and return it.
export const setAppointmentService = async ({date, time, userId}: AppointmentDto): Promise<Appointment> => {
    const user = await UserRepository.checkId(userId);    
    const newAppointment = await AppointmentRepository.create({date, time, user: user, status: appointmentStatus.ACTIVE});
    await AppointmentRepository.save(newAppointment);
    
    return newAppointment;
};

//Get an appointment by id and change it status to "cancelled".
export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
    const appointment = await AppointmentRepository.findById(id);
    appointment.status = appointmentStatus.CANCELLED;
    await AppointmentRepository.save(appointment);
    
    return appointment;
};