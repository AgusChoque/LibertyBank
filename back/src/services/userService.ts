import UserDto from "../dto/UserDto";
import IUser from "../interfaces/IUser";
import { setCredentialService } from "./credentialService";

//Array of IUser to use as "preload".
const users: IUser[] = [];

const user1: IUser = {
    id: 1,
    name: "Juan Pérez",
    email: "juanperez@example.com",
    birthdate: new Date("1990-05-15"),
    nDni: 12345678,
    credentialsId: 1
};

const user2: IUser = {
    id: 2,
    name: "Admin Test",
    email: "admintest@example.com",
    birthdate: new Date("1985-09-20"),
    nDni: 87654321,
    credentialsId: 2
};

users.push(user1);
users.push(user2);

//Return all users.
export const getUsersService = async (): Promise<IUser[]> => {
    return users
};

//Return a user by id.
export const getUserByIdService = async (id:number): Promise<IUser> => {
    const user:IUser | undefined = users.find((user:IUser): IUser | undefined => { if (user.id === id) { return user }});
    if (user == undefined) {
        throw Error;
    } else {
        return user;
    }
}

//Create a new user. 
let id = 3;

export const setUserService = async (userDto:UserDto):Promise<IUser> => {
    const newCredential: number = await setCredentialService(userDto.credentials);

    const newUser: IUser = {
        id,
        name: userDto.name,
        email: userDto.email,
        birthdate: new Date(userDto.birthdate),
        nDni: userDto.nDni,
        credentialsId: newCredential
    };

    users.push(newUser);
    id++;
    return newUser;
}