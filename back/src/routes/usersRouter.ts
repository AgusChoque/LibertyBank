import { Router } from "express";
import { getUsers, getUserById, createUser, logInUser } from "../controllers/usersController";
import validRegister from "../middleware/validUserRegister";
import formatRegister from "../middleware/formatUserRegister";
import paramIdValidate from "../middleware/paramIdValidate";
import validLogin from "../middleware/validLogin";

const usersRouter: Router = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", paramIdValidate, getUserById);

usersRouter.post("/register", validRegister, formatRegister, createUser);
usersRouter.post("/login", validLogin, logInUser);
export default usersRouter;