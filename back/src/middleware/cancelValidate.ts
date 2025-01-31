import { NextFunction, Request, Response } from "express";
import AppointmentRepository from "../repositories/AppointmentRepository";
import { Appointment } from "../entities/Appointment";
import DataError from "../errors/dataError";

const cancelValidate = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const appointment: Appointment | null = await AppointmentRepository.findOneBy({id});
    if (!appointment) next (new DataError(404, "Appointment not found."));
    else {
        const [hour, min] = appointment.time.split(":").map(Number);
        const [day, month, year] = appointment.date.split("/").map(Number);

        const now = new Date ();
        const dateLimitToCancel = new Date(year, month -1, day - 1, hour, min);
    
        if (now > dateLimitToCancel) next(new DataError(400, "The appointment can only be canceled 24 hours before the scheduled time."));
    }

    next();
};

export default cancelValidate;