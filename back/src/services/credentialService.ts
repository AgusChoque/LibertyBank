import CredentialRepository from "../repositories/CredentialRepository";
import CredentialDto from "../dto/CredentialDto";

//Create a new credential and return id.
export const registerService = async (CredentialDto: CredentialDto): Promise<number> => {
    const newCredential = await CredentialRepository.create(CredentialDto)
    const result = await CredentialRepository.save(newCredential);

    return result.id
};

//Validate if username and password exist. In that case return id.
export const loginService = async ({username, password}: CredentialDto): Promise<number>=> {
    const userId: number = await CredentialRepository.login(username, password);
    return userId;
};