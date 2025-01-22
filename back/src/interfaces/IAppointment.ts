import IUser from "./IUser";

enum appointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
};

interface IAppointment {
    id: number,
    date: Date,
    time: Date,
    userId: IUser,
    status: appointmentStatus
};

export default IAppointment;