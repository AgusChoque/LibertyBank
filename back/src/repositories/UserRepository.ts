import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User).extend({
    checkId: async (id: number): Promise<User> => {
        const user: User | null = await UserRepository.findOneBy({id});
        if (user) return user;
        else throw Error(`The user with ID ${id} does not exist.`);
    },
    findById: async (id: number, relation: boolean = true): Promise<User> => {
        const user = await UserRepository.findOne({
            where:{id},
            relations:{
                appointments: relation,
            }
        });

        if (!user) throw Error(`The user with ID ${id} does not exist.`);
        else return user;
    }
});

export default UserRepository;