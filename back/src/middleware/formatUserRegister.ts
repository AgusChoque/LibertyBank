import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/CredentialRepository";

const formatUserRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, birthdate, nDni, credentials } = req.body;

    //Validations for name.
    const nameSplit: string[] = name.split(""); 
    if(name.length > 50 || name.length < 10) next({statusCode: 400, message: "The name must be between 10 and 50 characters."});

    //Validations for email.
    const emailDB = await UserRepository.findBy({email}); 
    if (emailDB.length) next({statusCode: 400, message: `The email ${email} already exists.`});
    if(email.length > 100) next({statusCode: 400, message: "The email must be less than 100 characters."});

    //Validations for birthdate.
    const split: string[] = birthdate.split("-");
    const date: number[] = split.map((num) => Number(num));

    if(date.length !== 3) next({statusCode: 400, message: "The birthdate format is incorrect."});
    
    const year: number = date[0];
    const month: number = date[1];
    const day: number = date[2];
    const errorNumber: string[] = [];

    //Validate if every field is a number.
    if(!year) errorNumber.push("year");
    if(!month) errorNumber.push("month");
    if(!day) errorNumber.push("day");
    if(errorNumber) {
        switch (errorNumber.length) {
            case 1:
                next({statusCode: 400, message: `The ${errorNumber[0]} must be a number.`});
                break;
            case 2:
                next({statusCode: 400, message: `The ${errorNumber[0]} and ${errorNumber[1]} must be numbers.`});
                break;
            case 3:
                next({statusCode: 400, message: `The ${errorNumber[0]}, ${errorNumber[1]}, and ${errorNumber[2]} must be numbers.`});
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
                next({statusCode: 400, message: `The ${errorInteger[0]} must be an integer.`});
                break;
            case 2:
                next({statusCode: 400, message: `The ${errorInteger[0]} and ${errorInteger[1]} must be integers.`});
                break;
            case 3:
                next({statusCode: 400, message: `The ${errorInteger[0]}, ${errorInteger[1]}, and ${errorInteger[2]} must be integers.`});
                break;
        };
    }

    //Validate if every field is between the numbers that must to be.
    if(year > 2013 || year < 1925) next({statusCode: 400, message: "The year must be between 1945 and 2013."});
    if(month < 1 || month > 12) next({statusCode: 400, message: "The month must be between 1 and 12."});
    if(day < 1) next({statusCode: 400, message: "The day mustn't be less than 1."});
    if(month === 2 && day > 28) next({statusCode: 400, message: "The day must be between 1 and 28."});
    if((month === 1 || 3 || 5 || 7 || 8 || 10 || 12 ) && day > 31) next({statusCode: 400, message: "The day must be between 1 and 31."});
    if((month === 4 || 6 || 9 || 11) && day > 30) next({statusCode: 400, message: "The day must be between 1 and 30."}); 

    //Validations for nDni.
    if(nDni < 20000000 || nDni > 50000000) next({statusCode: 400, message: "The nDni must be between 20M and 50M."});

    const dniDB: User | null = await UserRepository.findOneBy({nDni});
    if (dniDB) next({statusCode: 400, message: `The DNI ${nDni} already exists.`});

    //Validations for username.
    const username = credentials.username;
    const splitUsername: string[] = username.split("");
    if(splitUsername.length < 5 || splitUsername.length > 25) next({statusCode: 400, message: "Username must be between 5 and 25 characters."});

    const noSpaces: string[] = splitUsername.filter((char) => {
        if(char === " ") return char;
    });
    if (noSpaces.length) next({statusCode: 400, message: "Username mustn't have spaces."});

    const usernameDB: Credential | null = await CredentialRepository.findOneBy({username});
    if(usernameDB) next({statusCode: 400, message: `The username ${username} already exists.`});

    //Validations for password.
    const password = credentials.password;
    if (password.length < 8) next({statusCode: 400, message: "The password mustn't be less than 8 characters."});

    next();
};

export default formatUserRegister;