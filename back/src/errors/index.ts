import { NextFunction, Request, Response } from "express";
import DataError from "./dataError";
import LoginError from "./loginError";

type AppError = DataError | LoginError | Error;

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof LoginError) {
        res.status(err.statusCode).json({
            login: err.login,
            error: err.message
        });
    } else if (err instanceof DataError) {
        res.status(err.statusCode).json({
            error: err.message
        });
    } else {
        res.status(500).json({
            error: err.message
        });
    };
};

export default errorHandler;