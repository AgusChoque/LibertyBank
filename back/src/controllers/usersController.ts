import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
    res.send("Get the list of all users.");
};

export const getUserById = async (req: Request, res: Response) => {
    res.send("Get the details of a specific user.");
};

export const createUser = async (req: Request, res: Response) => {
    res.send("Register a new user.");
};

export const logInUser = async (req: Request, res: Response) => {
    res.send("User login to the application.");
};