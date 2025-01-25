import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";

const CredentialRepository = AppDataSource.getRepository(Credential).extend({
    findById: async function (id: number): Promise<Credential> {
        const credential = await CredentialRepository.findOneBy({id});
        if(!credential) throw Error("Invalid credential ID.");
        else return credential;
    },
});

export default CredentialRepository;