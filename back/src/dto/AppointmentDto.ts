import DateString from "../types/DateString";
import Reason from "../types/Reason";

interface AppointmentDto {
    date: DateString,
    time: string,
    userId: number,
    reason: Reason
};

export default AppointmentDto;