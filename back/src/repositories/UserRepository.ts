import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User).extend({
    checkId: async (id: number): Promise<User> => {
        const user: User | null = await UserRepository.findOneBy({id});
        if (user) return user;
        else throw Error("Invalid user ID.");
    },
    findById: async (id: number, relation: boolean = true): Promise<User> => {
        const user = await UserRepository.findOne({
            where:{id},
            relations:{
                appointments: relation,
            }
        });

        if (!user) throw Error("Invalid user ID.");
        else return user;
    }
});

export default UserRepository;