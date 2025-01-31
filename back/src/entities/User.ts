import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";
import DateString from "../types/DateString";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length:100})
    name: string

    @Column({length:100})
    email: string

    @Column()
    birthdate: DateString

    @Column("integer")
    nDni: number

    @OneToOne(()=>Credential)
    @JoinColumn()
    credentials: Credential

    @OneToMany(()=>Appointment,(appointment) => appointment.user)
    appointments: Appointment[]
};