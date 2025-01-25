import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { createUserService, getUserByIdService, getUsersService } from "../services/userService";
import { User } from "../entities/User";
import { registerService } from "../services/credentialService";

export const getUsers = async (req: Request, res: Response, next: NextFunction)  => {
    try {
        const users: User[] = await getUsersService();
        res.status(200).json({
            message: "Users found successfully.",
            data: users
        })
    } catch {
        next(error);
    };
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userById: User = await getUserByIdService(Number(req.params.id));
        res.status(200).json({
            message: "User found successfully.",
            data: userById
        });
    } catch {
        next(error);
    };
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, birthdate, nDni, credentials} = req.body
        const newCredential = await registerService(credentials);
        const newUser = await createUserService({name, email, birthdate, nDni, credentialId: newCredential});
        res.status(201).json({
            message: "User created successfully.",
            data: {...newUser, credentials:undefined}
        });
    } catch {
        next(error);
    };
};

export const logInUser = async (req: Request, res: Response, next: NextFunction) => {
    res.send("User login to the application.");
};