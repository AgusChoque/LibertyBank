import { AppDataSource } from "../config/data-source";
import CredentialDto from "../dto/CredentialDto";
import CredentialRepository from "../repositories/CredentialRepository";

const credentialData: CredentialDto[] = [
  {
    username: "john_doe",
    password: "securePass123"
  },
  {
    username: "alice_smith",
    password: "myPassword456"
  },
  {
    username: "michael_jones",
    password: "pass123word!"
  },
  {
    username: "sarah_connor",
    password: "t3rminat0r"
  }
];

const preloadCredentials = async () => {
    await AppDataSource.transaction(async (transactionalEntityManager) => {
        for await (const credential of credentialData) {
            const newCredential = await CredentialRepository.create(credential);
            await transactionalEntityManager.save(newCredential);
        };
        
        console.log("Credential preload completed successfully.")
    });
};

export default preloadCredentials;