import { NextFunction, Request, Response } from "express";
import AppointmentRepository from "../repositories/AppointmentRepository";
import { Appointment } from "../entities/Appointment";

const cancelValidate = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const appointment: Appointment = await AppointmentRepository.findById(id);
    const appointmentTime = appointment.time.split(":");
    const hour = Number(appointmentTime[0]);
    const min = Number(appointmentTime	[1]);
    const now = new Date ();
    const dateLimitToCancel = new Date(appointment.date.getFullYear(), appointment.date.getMonth() -1, appointment.date.getDate() - 1, hour, min);

    if (now > dateLimitToCancel) next({statusCode: 400, message: "The appointment can only be canceled 24 hours before the scheduled time."});

    next();
};

export default cancelValidate;