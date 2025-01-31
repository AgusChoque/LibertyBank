import { NextFunction, Request, Response } from "express";
import DataError from "../errors/dataError";

const validAppointment = (req: Request, res: Response, next: NextFunction) => {
    const {date, time, reason, userId} = req.body;

    //Validate if the fields are empty.
    const empty: string[] = []
    if (!date) empty.push("date");
    if (!time) empty.push("time");
    if (!reason) empty.push("reason");
    if (!userId) empty.push("userId");
        if(empty.length) {
            switch (empty.length) {
                case 1:
                    next(new DataError(400, `The field ${empty[0]} mustn't be empty.`));
                    break;
                case 2:
                    next(new DataError(400, `The fields ${empty[0]} and ${empty[1]} mustn't be empty.`));
                    break;
                case 3:
                    next(new DataError(400, `The fields ${empty[0]}, ${empty[1]} and ${empty[2]} mustn't be empty.`));
                    break;
                case 4:
                    next(new DataError(400, `The fields ${empty[0]}, ${empty[1]}, ${empty[2]} and ${empty[3]} mustn't be empty.`));
                    break;
            };
        };

    //Validate if the fields have the correct data type.
    const typeString: string[] = [];
    const typeNumber: string[] = [];

    if (typeof date !== "string") typeString.push("date");
    if (typeof time !== "string") typeString.push("time");
    if (typeof reason !== "string") typeString.push("reason");
    if (typeof userId !== "number") typeNumber.push("userId");
    
    if (typeNumber.length) {
        if (!typeString.length) next(new DataError(400, `The field ${typeNumber[0]} must be a number.`));
        else {
            switch (typeString.length) {
                case 1:
                    next(new DataError(400, `The field ${typeNumber[0]} must be a number and the field ${typeString[0]} must be a string.`));
                    break;
                case 2:
                    next(new DataError(400, `The field ${typeNumber[0]} must be a number. The fields ${typeString.join(" and ")} must be strings.`));
                    break;
                case 3:
                    next(new DataError(400, `The field ${typeNumber[0]} must be a number. The fields ${typeString[0]}, ${typeString[1]} and ${typeString[2]} must be strings.`));
                    break;
            }
        }
    } else {
        if(typeString.length) {
            switch (typeString.length) {
                case 1:
                    next(new DataError(400, `The field ${typeString[0]} must be a string.`));
                    break;
                case 2:
                    next(new DataError(400, `The fields ${typeString.join(" and ")} must be strings.`));
                    break;
                case 3:
                    next(new DataError(400, `The fields ${typeString[0]}, ${typeString[1]} and ${typeString[2]} must be strings.`));
                    break;
            };
        };
    };

    next()
};

export default validAppointment;