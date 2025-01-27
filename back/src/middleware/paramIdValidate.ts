import { NextFunction, Request, Response } from "express";

const paramIdValidate = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if(!id && id !== 0) next({statusCode: 400, message: "The ID must be a number."});
    if(!Number.isInteger(id)) next({statusCode: 400, message: "The ID must be an integer."});
    if(id < 1) next({statusCode: 400, message: "The ID must be greater than 0."});

    next();
};

export default paramIdValidate;