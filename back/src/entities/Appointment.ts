import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import Reason from "../types/Reason";
import DateString from "../types/DateString";

export enum appointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
};

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: DateString

    @Column()
    time: string

    @Column()
    reason: Reason

    @ManyToOne(()=>User,(user)=>user.appointments)
    user: User

    @Column()
    status: appointmentStatus
 
}