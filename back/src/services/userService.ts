import UserRepository from "../repositories/UserRepository";
import CredentialRepository from "../repositories/CredentialRepository";
import UserDto from "../dto/UserDto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import DataError from "../errors/dataError";

//Return all users.
export const getUsersService = async (): Promise<User[]> => {
    const users: User[] = await UserRepository.find({
        relations:{
            appointments: true,
        },
    });
    if(users.length === 0) {
        throw new DataError(404, "Users not found.");
    };
    return users;
};

//Return a user by id.
export const getUserByIdService = async (id: number, relations: boolean = false): Promise<User> => {
    const user: User = await UserRepository.findById(id, relations);
    return user;
};

//Create a new user. 
export const createUserService = async (userDto: UserDto): Promise<User> => { 
    const credential: Credential = await CredentialRepository.findById(userDto.credentialId);

    const newUser: User = await UserRepository.create({...userDto, credentials: credential});
    await UserRepository.save(newUser);
    
    return newUser;
};