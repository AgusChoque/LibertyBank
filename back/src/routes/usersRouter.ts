import { Router } from "express";
import { getUsers, getUserById, createUser, logInUser } from "../controllers/usersController";
import validRegister from "../middleware/validUserRegister";
import formatRegister from "../middleware/formatUserRegister";

const usersRouter: Router = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);

usersRouter.post("/register", validRegister, formatRegister, createUser);
usersRouter.post("/login", logInUser);

export default usersRouter;