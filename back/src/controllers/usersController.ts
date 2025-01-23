import { error } from "console";
import { NextFunction, Request, Response } from "express";
import IUser from "../interfaces/IUser";
import { getUserByIdService, getUsersService, setUserService } from "../services/userService";

export const getUsers = async (req: Request, res: Response, next: NextFunction)  => {
    try {
        const users: IUser[] = await getUsersService();
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
        const userById: IUser = await getUserByIdService(Number(req.params.id));
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
        const newUser: IUser = await setUserService(req.body);
        res.status(201).json({
            message: "User created successfully.",
            data: newUser
        });
    } catch {
        next(error);
    };
};

export const logInUser = async (req: Request, res: Response, next: NextFunction) => {
    res.send("User login to the application.");
};