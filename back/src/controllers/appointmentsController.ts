import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { cancelAppointmentService, getAppointmentByIdService, getAppointmentsService, setAppointmentService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";

export const getAppointments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointments: Appointment[] = await getAppointmentsService();
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
        const appointment: Appointment = await getAppointmentByIdService(Number(req.body.id));
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
        const newAppointment: Appointment = await setAppointmentService(req.body);
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
        const cancel: Appointment = await cancelAppointmentService(Number(req.body.id));
        res.status(200).json({
            message: "Appointment cancelled successfully.",
            data: cancel
        });
    } catch {
        next(error);
    };
};