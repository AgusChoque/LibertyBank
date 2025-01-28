import { Request, Response } from "express";
import { createUserService, getUserByIdService, getUsersService } from "../services/userService";
import { User } from "../entities/User";
import { loginService, registerService } from "../services/credentialService";
import catchAsync from "../utils/catchAsync";

const getUsersController = async (req: Request, res: Response)  => {
    const users: User[] = await getUsersService();
    res.status(200).json({
        message: "Users found successfully.",
        data: users,
    });
};

const getUserByIdController = async (req: Request, res: Response) => {
    const userById: User = await getUserByIdService(Number(req.params.id), true);
    res.status(200).json({
        message: "User found successfully.",
        data: userById
    });
};

const createUserController = async (req: Request, res: Response) => {
    const {name, email, birthdate, nDni, credentials} = req.body;
    const newCredential: number = await registerService(credentials);
    const newUser: User = await createUserService({name, email, birthdate, nDni, credentialId: newCredential});
    res.status(201).json({
        message: "User created successfully.",
        data: {...newUser, credentials:undefined},
    });
};

const logInUserController = async (req: Request, res: Response) => {
    const userId: number = await loginService(req.body);
    const user: User = await getUserByIdService(userId);
    res.status(200).json({
        login: true,
        user,
    })
};

export const getUsers = catchAsync(getUsersController);
export const getUserById = catchAsync(getUserByIdController);
export const createUser = catchAsync(createUserController);
export const logInUser = catchAsync(logInUserController);