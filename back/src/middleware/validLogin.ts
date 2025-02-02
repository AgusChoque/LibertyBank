import { NextFunction, Request, Response } from "express";
import DataError from "../errors/dataError";
import isValidPassword from "../utils/isValidPassword";

const validLogin = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    
    //Validate for username.
    if(typeof username !== "string") next(new DataError(400, "Username must be a string."));

    //Validate for password.
    if(typeof password !== "string") next(new DataError(400, "Password must be a string."));
    if (password.length < 8) next(new DataError(400, "The password mustn't be less than 8 characters."));
    if (!isValidPassword(password)) next(new DataError(400, "The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."));

    next();
};

export default validLogin;