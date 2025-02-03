import { AppDataSource } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/CredentialRepository";
import UserRepository from "../repositories/UserRepository";

const usersData: UserDto[] = [
    {
        name: "John Doe",
        email: "john.doe@example.com",
        birthdate: "15/05/1990",
        nDni: 12345678,
        credentialId: 1
    },
    {
        name: "Alice Smith",
        email: "alice.smith@example.com",
        birthdate: "23/09/1985",
        nDni: 23456789,
        credentialId: 2
    },
    {
        name: "Michael Jones",
        email: "michael.jones@example.com",
        birthdate: "30/11/1992",
        nDni: 34567890,
        credentialId: 3
    },
    {
        name: "Sarah Connor",
        email: "sarah.connor@example.com",
        birthdate: "10/01/1980",
        nDni: 45678901,
        credentialId: 4
    },
    {
        name: "Agustin Choque",
        email: "agus@admin.com",
        birthdate: "27/11/2001",
        nDni: 43430430,
        credentialId: 5
    }
];

const preloadUsers = async () => {
    const queryRunner = await AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const usersPromises = usersData.map(async(user) => {
        const newUser = UserRepository.create(user);

        const credential: Credential = await CredentialRepository.findById(user.credentialId);
        newUser.credentials = credential;

        await queryRunner.manager.save(newUser);
    })

    await queryRunner.startTransaction();
    try {
        await Promise.all(usersPromises);
        console.log("User preload completed successfully.")
        await queryRunner.commitTransaction();
    } catch (err) {
        console.error("Error on preload users: ", err)
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release()
    }
};

export default preloadUsers;