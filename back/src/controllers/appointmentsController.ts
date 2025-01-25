import { Request, Response } from "express";
import { cancelAppointmentService, getAppointmentByIdService, getAppointmentsService, setAppointmentService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";
import catchAsync from "../utils/catchAsync";

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

const createAppointmentController = async (req: Request, res: Response) => {
    const newAppointment: Appointment = await setAppointmentService(req.body);
    res.status(201).json({
        message: "Appointment created successfully.",
        data: newAppointment
    });
};

const cancelAppointmentController = async (req: Request, res: Response) => {
    const cancel: Appointment = await cancelAppointmentService(Number(req.params.id));
    res.status(200).json({
        message: "Appointment cancelled successfully.",
        data: cancel
    });
};

export const getAppointments = catchAsync(getAppointmentsController);
export const getAppointmentById = catchAsync(getAppointmentByIdController);
export const createAppointment = catchAsync(createAppointmentController);
export const cancelAppointment = catchAsync(cancelAppointmentController);