import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
    findById: async function (id: number): Promise<Appointment> {
        const appointment:Appointment | null = await AppointmentRepository.findOne({
            where:{
                id,
            },
            relations:{
                user: true,
            },
        });
        if (appointment) return appointment;
        else throw Error("Invalid appointment ID.");
    },
});

export default AppointmentRepository;