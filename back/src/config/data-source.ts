import { DataSource } from "typeorm";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { DATABASE, HOST, PASSWORD, PORTDB, USER } from "./envs";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: HOST,
    port: PORTDB,
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [Credential, User, Appointment],
    subscribers: [],
    migrations: [],
});