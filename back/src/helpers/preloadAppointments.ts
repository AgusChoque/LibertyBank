import { AppDataSource } from "../config/data-source"
import AppointmentDto from "../dto/AppointmentDto";
import { appointmentStatus } from "../entities/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";

const appointmentsData: AppointmentDto[] = [{
    date: new Date("2025-03-10"),
    time: "09:00",
    userId: 1
},
{
    date: new Date("2025-04-15"),
    time: "14:30",
    userId: 2
},
{
    date: new Date("2025-05-20"),
    time: "11:00",
    userId: 3
},
{
    date: new Date("2025-06-05"),
    time: "16:45",
    userId: 4
},
{
    date: new Date("2025-07-12"),
    time: "08:15",
    userId: 1
},
{
    date: new Date("2025-08-22"),
    time: "13:00",
    userId: 2
},
{
    date: new Date("2025-09-30"),
    time: "10:30",
    userId: 3
},
{
    date: new Date("2025-10-18"),
    time: "17:20",
    userId: 4
},
{
    date: new Date("2025-11-25"),
    time: "15:45",
    userId: 3
},
{
    date: new Date("2025-12-05"),
    time: "12:00",
    userId: 4
}]

const preloadAppointments = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const appointmetsPromises = appointmentsData.map(async(appointment) => {
        const newAppointment = AppointmentRepository.create({...appointment, status: appointmentStatus.ACTIVE});

        const user = await UserRepository.checkId(appointment.userId);
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