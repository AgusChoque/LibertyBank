import { CredentialModel, UserModel } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/user";

//Return all users.
export const getUsersService = async (): Promise<User[]> => {
    const users: User[] = await UserModel.find({
        relations:{
            appointments: true
        }
    });
    return users
};

//Return a user by id.
export const getUserByIdService = async (id:number): Promise<User> => {
    const user = await UserModel.findOne({
        where:{
            id
        },
        relations:{
            appointments: true
        }
    });
    if(user) {
        return user
    } else {
        throw Error(`The user with ID ${id} does not exist.`);
    };
};

//Create a new user. 
export const createUserService = async (userDto:UserDto):Promise<User> => {
    const {name, email, birthdate, nDni} = userDto;

    const newUser:User = await UserModel.create({name, email, birthdate, nDni});
    const credential: Credential | null = await CredentialModel.findOneBy({id: userDto.credentialId})
    
    if (credential){
        newUser.credentials = credential
        await UserModel.save(newUser);
        return newUser
    } else {
        throw Error("No valid credential was found for the user.")
    };
};