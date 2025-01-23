export enum appointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
};

export interface IAppointment {
    id: number,
    date: Date,
    time: string,
    userId: number,
    status: appointmentStatus
};