import { Router } from "express";
import { getUsers, getUserById, createUser, logInUser } from "../controllers/usersController";

const usersRouter: Router = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);

usersRouter.post("/register", createUser);
usersRouter.post("/login", logInUser);

export default usersRouter;