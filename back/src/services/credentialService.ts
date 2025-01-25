import CredentialRepository from "../repositories/CredentialRepository";
import CredentialDto from "../dto/CredentialDto";
import { Credential } from "../entities/Credential";
import errorDto from "../dto/errorDto";

//Create a new credential and return id.
export const registerService = async (CredentialDto: CredentialDto): Promise<number> => {
    const newCredential = await CredentialRepository.create(CredentialDto)
    const result = await CredentialRepository.save(newCredential);

    return result.id
};

//Validate if username and password exist. In that case return id.
export const loginService = async ({username, password}: CredentialDto): Promise<number | errorDto>=> {
    const user: Credential | null = await CredentialRepository.findOneBy({username});
    if(!user){
        const error:errorDto = {
            login: false,
            message: "User not found.",
            statusCode: 400
        }
        return error;
    } else {
        if(user.password !== password) {
            const error:errorDto = {
                login: false,
                message: "Password invalid.",
                statusCode: 400
            }
            return error;
        } else {
            return user.id;
        }
    }
};