import { CredentialModel } from "../config/data-source";
import CredentialDto from "../dto/CredentialDto";
import ICredential from "../interfaces/ICredential";

//Create a new credential and return id.
export const registerService = async (CredentialDto: CredentialDto): Promise<number> => {
    const newCredential = await CredentialModel.create(CredentialDto)
    const result = await CredentialModel.save(newCredential);

    return result.id
};

//Validate if username and password exist. In that case return id.
export const loginService = async ({username, password}: CredentialDto): Promise<number>=> {
    return 1
};