import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/CredentialRepository";
import preloadAppointments from "./preloadAppointments";
import preloadCredentials from "./preloadCredentials";
import preloadUsers from "./preloadUsers";

const preloadData = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
        const credentials: Credential[] = await CredentialRepository.find();
        if (credentials.length) return console.log("The preloading was not performed because there is already data in the database.");

        await preloadCredentials();
        await preloadUsers();
        await preloadAppointments();

        await queryRunner.commitTransaction();
    } catch (err) {
        console.log(err);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
};

export default preloadData;