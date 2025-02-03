import { AppDataSource } from "../config/data-source";
import CredentialDto from "../dto/CredentialDto";
import CredentialRepository from "../repositories/CredentialRepository";

const credentialData: CredentialDto[] = [
  {
      username: "john.doe@example.com",
      password: "John@1234"
  },
  {
      username: "alice.smith@example.com",
      password: "Alice#5678"
  },
  {
      username: "michael.jones@example.com",
      password: "Michael$910"
  },
  {
      username: "sarah.connor@example.com",
      password: "Sarah*1122"
  },
  {
    username: "aguscho",
    password: "Admin123."
  }
]

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