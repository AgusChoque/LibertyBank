import { DataSource } from "typeorm";
import { Credential } from "../entities/Credential";
import { User } from "../entities/user";
import { Appointment } from "../entities/appointment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "43812Agus",
    database: "henry_m3",
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [Credential, User, Appointment],
    subscribers: [],
    migrations: [],
});

export const CredentialModel = AppDataSource.getRepository(Credential);
export const UserModel = AppDataSource.getRepository(User);
export const AppointmentModel = AppDataSource.getRepository(Appointment);