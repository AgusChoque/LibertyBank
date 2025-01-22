import IUser from "./IUser";

interface IAppointment {
    id: number,
    date: Date,
    time: number,
    userId: IUser,
    status: boolean
};

export default IAppointment;