import { NextFunction, Request, Response } from 'express';

const catchAsync = (controller: (req: Request, res: Response) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        controller(req, res).catch((err) => next({login: err.login ,message: err.message, statusCode: err.statusCode || 404})); 
    };
};

export default catchAsync;