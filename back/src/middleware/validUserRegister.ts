import { NextFunction, Request, Response } from "express";
import DataError from "../errors/dataError";

const validRegister = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, birthdate, nDni, credentials } = req.body;

    //Validate if the fields are empty.
    const empty: string[] = [];
    if(!name) empty.push("name");
    if(!email) empty.push("email");
    if(!birthdate) empty.push("birthdate");
    if(!nDni) empty.push("nDni");
    if(!credentials.username) empty.push("username");
    if(!credentials.password) empty.push("password");

    if(empty.length === 1) next(new DataError(400, `The ${empty[0]} field mustn't be empty`));
    else if (empty.length > 1) next(new DataError(400, `The fields ${empty.join(", ")} mustn't be empty`));

    //Validate if the fields have the correct data type.
    const string: string[] = [];
    const number: string[] = [];
    if(typeof name !== "string") string.push("name");
    if(typeof email !== "string") string.push("email");
    if(typeof birthdate !== "string") string.push("birthdate");
    if(typeof nDni !== "number") number.push("nDni");
    if(typeof credentials.username !== "string") string.push("username");
    if(typeof credentials.password !== "string") string.push("password");

    if (string.length > 0) next(new DataError(400, `The ${string.join(", ")} must be a string.`));
    if (number.length > 0) next(new DataError(400, `The ${number[0]} must be a number.`));

    next();
};

export default validRegister