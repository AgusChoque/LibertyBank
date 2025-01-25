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
    const appointment:Appointment | null = await AppointmentRepository.findOne({
        where:{
            id,
        },
        relations:{
            user: true,
        },
    });

    if (appointment) {
        return appointment;
    } else {
        throw Error(`The appointment with ID ${id} does not exist.`)
    }
};

//Create appointment and return it.
export const setAppointmentService = async ({date, time, userId}: AppointmentDto): Promise<Appointment> => {
    const user = await UserRepository.findOneBy({id: userId});
    if(user){
        const newAppointment = await AppointmentRepository.create({date, time, user: user, status: appointmentStatus.ACTIVE});
        await AppointmentRepository.save(newAppointment);
        return newAppointment;
    } else {
        throw Error("The user requesting a new appointment does not exist.")
    }

};

//Get an appointment by id and change it status to "cancelled".
export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
    const appointment = await AppointmentRepository.findOneBy({id});
    if(appointment) {
        appointment.status = appointmentStatus.CANCELLED;
        await AppointmentRepository.save(appointment);
        return appointment;
    } else {
        throw Error(`The appointment with ID ${id} does not exist.`);
    };
};