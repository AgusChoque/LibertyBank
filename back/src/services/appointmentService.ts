import { AppointmentModel, UserModel } from "../config/data-source";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment, appointmentStatus } from "../entities/appointment";

//Return all appointments.
export const getAppointmentsService = async (): Promise<Appointment[]> => {
    const appointments: Appointment[] = await AppointmentModel.find({
        relations: {
            user: true,
        },
    });
    return appointments;
};

//Return appointment by id.
export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const appointment:Appointment | null = await AppointmentModel.findOne({
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
    const user = await UserModel.findOneBy({id: userId});
    if(user){
        const newAppointment = await AppointmentModel.create({date, time, user: user, status: appointmentStatus.ACTIVE});
        await AppointmentModel.save(newAppointment);
        return newAppointment;
    } else {
        throw Error("The user requesting a new appointment does not exist.")
    }

};

//Get an appointment by id and change it status to "cancelled".
export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
    const appointment = await AppointmentModel.findOneBy({id});
    if(appointment) {
        appointment.status = appointmentStatus.CANCELLED;
        await AppointmentModel.save(appointment);
        return appointment;
    } else {
        throw Error(`The appointment with ID ${id} does not exist.`);
    };
};