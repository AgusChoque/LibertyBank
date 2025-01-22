import { Router } from "express";
import { getAppointments, getAppointmentById, createAppointment, cancelAppointments } from "../controllers/appointmentsController";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAppointments);
appointmentsRouter.get("/:id", getAppointmentById);

appointmentsRouter.post("/schedule", createAppointment);

appointmentsRouter.put("/cancel", cancelAppointments);

export default appointmentsRouter;