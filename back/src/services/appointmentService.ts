import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment, appointmentStatus } from "../entities/Appointment";
import DataError from "../errors/dataError";
import transporter from "../config/transporter";
import { EmailDto } from "../dto/EmailDto";

//Return all appointments.
export const getAppointmentsService = async (): Promise<Appointment[]> => {
    const appointments: Appointment[] = await AppointmentRepository.find({
        relations: {
            user: true,
        },
    });
    if (!appointments.length) throw new DataError(404, "Users not found.");
    return appointments;
};

//Return appointment by id.
export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const appointment: Appointment = await AppointmentRepository.findById(id, true);
    return appointment;
};

//Create appointment and return it.
export const setAppointmentService = async ({date, time, reason, userId}: AppointmentDto): Promise<Appointment> => {
    const user = await UserRepository.findById(userId);
        
    const newAppointment = await AppointmentRepository.create({date, time, user, reason, status: appointmentStatus.ACTIVE});
    await AppointmentRepository.save(newAppointment);
    
    return newAppointment;
};

//Get an appointment by id and change it status to "cancelled".
export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
    const appointment = await AppointmentRepository.findById(id, true);
    appointment.status = appointmentStatus.CANCELLED;
    await AppointmentRepository.save(appointment);
    
    return appointment;
};

//Get an email and send a mail to confirm.
export const sendMailService = async ({ subject, email, name, action, reason, date, time }: EmailDto) => {
    const message = `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #2c3e50; text-align: center;">${subject}</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Your appointment at <strong>Liberty Bank</strong> has been <strong>${action}</strong>. Below are the details:</p>
        <ul>
            <li><strong>Subject:</strong> ${reason}</li>
            <li><strong>Date:</strong> ${date}</li>
            <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>If you need to reschedule or book a new appointment, you can do so through our platform.</p>
        <br>
        <p>Best regards, <br><strong>Liberty Bank</strong></p>
    </div>
</body>
</html>
`;

    await transporter.sendMail({
        to: email,
        subject: `${subject} - Liberty Bank`,
        html: message
    });

};