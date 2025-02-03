import { Request, Response } from "express";
import { cancelAppointmentService, getAppointmentByIdService, getAppointmentsService, sendMailService, setAppointmentService, getAppointmetsByUserIdService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";
import catchAsync from "../utils/catchAsync";
import { action, subject } from "../dto/EmailDto";

const getAppointmentsController = async (req: Request, res: Response) => {
    const appointments: Appointment[] = await getAppointmentsService();
    res.status(200).json({
        message: "Appointments found successfully.",
        data: appointments
    });
};

const getAppointmentByIdController = async (req: Request, res: Response) => {
    const appointment: Appointment = await getAppointmentByIdService(Number(req.params.id));
    res.status(200).json({
        message: "Appointment found successfully.",
        data: appointment
    });
};

const getAppointmentsByUserIdController = async (req: Request, res: Response) => {
    const appointments: Appointment[] = await getAppointmetsByUserIdService(Number(req.params.id));
    res.status(200).json({
        message: "Appointments found successfully.",
        data: appointments,
    });
};

const createAppointmentController = async (req: Request, res: Response) => {
    const newAppointment: Appointment = await setAppointmentService(req.body);
    await sendMailService({
        subject: subject.CONFIRMED,
        email: newAppointment.user.email,
        name: newAppointment.user.name,
        action: action.CONFIRMED,
        reason: newAppointment.reason,
        date: newAppointment.date,
        time: newAppointment.time
    });
    res.status(201).json({
        message: "Appointment created successfully.",
        data: newAppointment
    });
};

const cancelAppointmentController = async (req: Request, res: Response) => {
    const cancel: Appointment = await cancelAppointmentService(Number(req.params.id));
    await sendMailService({
        subject: subject.CANCELLED,
        email: cancel.user.email,
        name: cancel.user.name,
        action: action.CANCELLED,
        reason: cancel.reason,
        date: cancel.date,
        time: cancel.time
    });
    res.status(200).json({
        message: "Appointment cancelled successfully.",
        data: cancel
    });
};

export const getAppointments = catchAsync(getAppointmentsController);
export const getAppointmentById = catchAsync(getAppointmentByIdController);
export const createAppointment = catchAsync(createAppointmentController);
export const cancelAppointment = catchAsync(cancelAppointmentController);
export const getAppointmentsByUserId = catchAsync(getAppointmentsByUserIdController);