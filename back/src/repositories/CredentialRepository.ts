import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";
import DataError from "../errors/dataError";
import LoginError from "../errors/loginError";

const CredentialRepository = AppDataSource.getRepository(Credential).extend({
    findById: async function (id: number): Promise<Credential> {
        const credential = await CredentialRepository.findOneBy({id});
        if(!credential) throw new DataError(400, `The credential with ID ${id} does not exist.`);
        else return credential;
    },
    login: async (username: string, password: string): Promise<number> => {
        const credential = await CredentialRepository.findOneBy({username});
        if (!credential) throw new LoginError(false, 404, "Username not found.");
        if (credential.password !== password) throw new LoginError(false, 400, "Incorrect password.");
        return credential.id;
    },
});

export default CredentialRepository;