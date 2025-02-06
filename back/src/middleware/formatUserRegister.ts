import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/CredentialRepository";
import DataError from "../errors/dataError";
import isValidEmail from "../utils/isValidEmail";
import isValidPassword from "../utils/isValidPassword";

const formatUserRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, birthdate, nDni, credentials } = req.body;

    //Validations for name.
    if(name.length > 50 || name.length < 8) next(new DataError(400, "The name must be between 8 and 50 characters."));

    //Validations for email.
    if (!isValidEmail(email)) next(new DataError(400, "The email is invalid."));

    const emailDB: User[] = await UserRepository.findBy({email}); 
    if (emailDB.length) next(new DataError(400, `The email ${email} already exists.`));
    if(email.length > 100) next(new DataError(400, "The email must be less than 100 characters."));

    //Validations for birthdate.
    const split: string[] = birthdate.split("-");
    const date: number[] = split.map(Number);

    if(date.length !== 3) next(new DataError(400, "The birthdate format is incorrect. Try DD/MM/YYYY"));
    
    const [year, month, day] = date;
    const errorNumber: string[] = [];

    //Validate if every field is a number.
    if(!year) errorNumber.push("year");
    if(!month) errorNumber.push("month");
    if(!day) errorNumber.push("day");
    if(errorNumber) {
        switch (errorNumber.length) {
            case 1:
                next(new DataError(400, `The ${errorNumber[0]} must be a number.`));
                break;
            case 2:
                next(new DataError(400, `The ${errorNumber[0]} and ${errorNumber[1]} must be numbers.`));
                break;
            case 3:
                next(new DataError(400, `The ${errorNumber[0]}, ${errorNumber[1]}, and ${errorNumber[2]} must be numbers.`));
                break;
        };
    };

    //Validate if every field is an integer.
    const errorInteger: string[] = [];

    if(!Number.isInteger(year)) errorInteger.push("year");
    if(!Number.isInteger(month)) errorInteger.push("month");
    if(!Number.isInteger(day)) errorInteger.push("day");
    if(errorInteger) {
        switch (errorInteger.length) {
            case 1:
                next(new DataError(400, `The ${errorInteger[0]} must be an integer.`));
                break;
            case 2:
                next(new DataError(400, `The ${errorInteger[0]} and ${errorInteger[1]} must be integers.`));
                break;
            case 3:
                next(new DataError(400, `The ${errorInteger[0]}, ${errorInteger[1]}, and ${errorInteger[2]} must be integers.`));
                break;
        };
    }

    //Validate if every field is between the numbers that must to be.
    if(year > 2007 || year < 1925) next(new DataError(400, "The year must be between 1945 and 2007."));
    if(month < 1 || month > 12) next(new DataError(400, "The month must be between 1 and 12."));
    if(day < 1) next(new DataError(400, "The day mustn't be less than 1."));
    if(month === 2 && day > 28) next(new DataError(400, "The day must be between 1 and 28."));
    if((month === 1 || 3 || 5 || 7 || 8 || 10 || 12 ) && day > 31) next(new DataError(400, "The day must be between 1 and 31."));
    if((month === 4 || 6 || 9 || 11) && day > 30) next(new DataError(400, "The day must be between 1 and 30.")); 
    req.body.birthdate = `${day}/${month}/${year}`

    //Validations for nDni.
    if(nDni < 20000000 || nDni > 50000000) next(new DataError(400, "The nDni must be between 20M and 50M."));

    const dniDB: User | null = await UserRepository.findOneBy({nDni});
    if (dniDB) next(new DataError(400, `The DNI ${nDni} already exists.`));

    //Validations for username.
    const username = credentials.username;
    const splitUsername: string[] = username.split("");
    if(splitUsername.length < 5) next(new DataError(400, "Username must be at least 5 characters."));

    const noSpaces: string[] = splitUsername.filter((char) => {
        if(char === " ") return char;
    });
    if (noSpaces.length) next(new DataError(400, "Username mustn't have spaces."));

    const usernameDB: Credential | null = await CredentialRepository.findOneBy({username});
    if(usernameDB) next(new DataError(400, `The username ${username} already exists.`));

    //Validations for password.
    const password = credentials.password;
    if (password.length < 8) next(new DataError(400, "The password mustn't be less than 8 characters."));

    if (!isValidPassword(password)) throw new DataError(400, "The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.")

    next();
};

export default formatUserRegister;