import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";

const mainRouter: Router = Router();

mainRouter.use("/users", usersRouter);
mainRouter.use("/appointments", appointmentsRouter);


export default mainRouter;