import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import DataError from "../errors/dataError";

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
    findById: async function (id: number, relations: boolean = false): Promise<Appointment> {
        const appointment:Appointment | null = await AppointmentRepository.findOne({
            where:{
                id,
            },
            relations:{
                user: relations,
            },
        });
        if (!appointment) throw new DataError(404, `The appointment with ID ${id} does not exist.`)
        return appointment
    },
});

export default AppointmentRepository;