import { NextFunction, Request, Response } from "express";
import DataError from "../errors/dataError";

const paramIdValidate = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if(!id && id !== 0) next(new DataError(400,"The ID must be a number."));
    else {
        if(!Number.isInteger(id)) next(new DataError(400,"The ID must be an integer."));
        if(id < 1) next(new DataError(400, "The ID must be greater than 0."));
    };

    next();
};

export default paramIdValidate;