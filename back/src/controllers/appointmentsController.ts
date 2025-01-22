import { Request, Response } from "express";

export const getAppointments = async (req: Request, res: Response) => {
    res.send("Get the list of all appointments for all users.");
};

export const getAppointmentById = async (req: Request, res: Response) => {
    res.send("Get the details of a specific appointment.");
};

export const createAppointment = async (req: Request, res: Response) => {
    res.send("Schedule a new appointment.");
};

export const cancelAppointments = async (req: Request, res: Response) => {
    res.send("Change the status of an appointment to cancelled.");
};