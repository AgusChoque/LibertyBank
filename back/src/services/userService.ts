import UserRepository from "../repositories/UserRepository";
import CredentialRepository from "../repositories/CredentialRepository";
import UserDto from "../dto/UserDto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";

//Return all users.
export const getUsersService = async (): Promise<User[]> => {
    const users: User[] = await UserRepository.find({
        relations:{
            appointments: true,
        },
    });
    return users
};

//Return a user by id.
export const getUserByIdService = async (id:number): Promise<User> => {
    const user = await UserRepository.findById(id)
    if(user) {
        return user
    } else {
        throw Error(`The user with ID ${id} does not exist.`);
    };
};

//Create a new user. 
export const createUserService = async (userDto:UserDto):Promise<User> => { 
    const newUser:User = await UserRepository.create(userDto);
    
    const credential: Credential = await CredentialRepository.findById(userDto.credentialId);
    newUser.credentials = credential;
    await UserRepository.save(newUser);
    return newUser;
};