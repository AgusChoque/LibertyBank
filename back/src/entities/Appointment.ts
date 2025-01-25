import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum appointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
};

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column()
    time: string

    @ManyToOne(()=>User,(user)=>user.appointments)
    user: User

    @Column()
    status: appointmentStatus
}