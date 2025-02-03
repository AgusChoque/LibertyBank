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
    findByUser: async function (id: number) {
      const appointments: Appointment[] = await AppointmentRepository.findBy({
        user: {
            id: id,
        },
      });
      if (!appointments) throw new DataError(404, "There are no appointments yet.");
      return appointments;
    },
});

export default AppointmentRepository;