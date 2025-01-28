import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import DataError from "../errors/dataError";

const UserRepository = AppDataSource.getRepository(User).extend({
    findById: async (id: number, relations: boolean = false): Promise<User> => {
        const user = await UserRepository.findOne({
            where:{id},
            relations:{
                appointments: relations,
            }
        });

        if (!user) throw new DataError(404, `The user with ID ${id} does not exist.`);
        else return user;
    },
});

export default UserRepository;