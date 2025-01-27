import { Router } from "express";
import { getAppointments, getAppointmentById, createAppointment, cancelAppointment } from "../controllers/appointmentsController";
import paramIdValidate from "../middleware/paramIdValidate";
import validAppointment from "../middleware/validAppointment";
import formatAppointment from "../middleware/formatAppointment";
import cancelValidate from "../middleware/cancelValidate";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAppointments);
appointmentsRouter.get("/:id", paramIdValidate, getAppointmentById);

appointmentsRouter.post("/schedule", validAppointment, formatAppointment, createAppointment);

appointmentsRouter.put("/cancel/:id", paramIdValidate, cancelValidate, cancelAppointment);

export default appointmentsRouter;