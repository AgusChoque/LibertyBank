import { AppDataSource } from "../config/data-source"
import AppointmentDto from "../dto/AppointmentDto";
import { appointmentStatus } from "../entities/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";

const appointmentsData: AppointmentDto[] = [
    { date: "10/03/2025", time: "09:00", userId: 1, reason: "Loan Application" },
    { date: "15/04/2025", time: "14:30", userId: 2, reason: "Credit Card Request" },
    { date: "20/05/2025", time: "11:00", userId: 3, reason: "Investment Advisory" },
    { date: "05/06/2025", time: "16:45", userId: 4, reason: "Fraud Report" },
    { date: "12/07/2025", time: "08:15", userId: 1, reason: "Document Submission" },
    { date: "22/08/2025", time: "13:00", userId: 2, reason: "Banking Assistance" },
    { date: "30/09/2025", time: "10:30", userId: 3, reason: "Check Deposit Issue" },
    { date: "18/10/2025", time: "17:20", userId: 4, reason: "Transaction Dispute" },
    { date: "25/11/2025", time: "15:45", userId: 3, reason: "Foreign Currency Exchange" },
    { date: "05/12/2025", time: "12:00", userId: 4, reason: "Debit Card Replacement" }
];

const preloadAppointments = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const appointmetsPromises = appointmentsData.map(async(appointment) => {
        const newAppointment = AppointmentRepository.create({...appointment, status: appointmentStatus.ACTIVE});

        const user = await UserRepository.findById(appointment.userId);
        newAppointment.user = user;
        
        await queryRunner.manager.save(newAppointment);
    });

    await queryRunner.startTransaction();
    try {
        await Promise.all(appointmetsPromises);
        console.log("Appointment preload completed successfully.")
        await queryRunner.commitTransaction();
    } catch (err) {
        console.error("Error on preload appointments: ", err);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    };
}

export default preloadAppointments;