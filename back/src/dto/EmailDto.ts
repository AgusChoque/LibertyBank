import DateString from "../types/DateString"
import Reason from "../types/Reason"

export enum action {
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled"
};

export enum subject {
    CONFIRMED = "Appointment Confirmation",
    CANCELLED = "Appointment Cancellation"
}

export interface EmailDto {
    subject: subject
    email: string
    name: string
    action: action
    reason: Reason
    date: DateString
    time: string
};