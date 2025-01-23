import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { cancelAppointmentService, getAppointmentByIdService, getAppointmentsService, setAppointmentService } from "../services/appointmentService";
import { IAppointment } from "../interfaces/IAppointment";

export const getAppointments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointments: IAppointment[] = await getAppointmentsService();
        res.status(200).json({
            message: "Appointments found successfully.",
            data: appointments
        });
    } catch {
        next(error);
    };
};

export const getAppointmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointment: IAppointment = await getAppointmentByIdService(Number(req.params.id));
        res.status(200).json({
            message: "Appointment found successfully.",
            data: appointment
        });
    } catch {
        next(error);
    };
};

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newAppointment: IAppointment = await setAppointmentService(req.body);
        res.status(201).json({
            message: "Appointment created successfully.",
            data: newAppointment
        });
    } catch {
        next(error);
    };
};

export const cancelAppointments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cancel: IAppointment = await cancelAppointmentService(Number(req.params.id));
        res.status(200).json({
            message: "Appointment cancelled successfully.",
            data: cancel
        });
    } catch {
        next(error);
    };
};