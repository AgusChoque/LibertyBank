import { NextFunction, Request, Response } from "express";

const formatAppointment = async (req: Request, res: Response, next: NextFunction) => {
    const {date, time, userId} = req.body;

    //Validations for userId.
    if(userId < 1) next({statusCode: 400, message: "The user ID must be greater than 0."});
    if (!Number.isInteger(userId)) next({statusCode: 400, message: "The user ID must be an integer."});

    //Validations for date.
    const split: string[] = date.split("-");
    const dateFinal: number[] = split.map((num) => Number(num));

    if(dateFinal.length !== 3) next({statusCode: 400, message: "The date format is incorrect. Try YYYY-MM-DD"});
    
    const year: number = dateFinal[0];
    const month: number = dateFinal[1];
    const day: number = dateFinal[2];
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
                next({statusCode: 400, message: `The ${errorInteger[0]}, ${errorInteger[1]} and ${errorInteger[2]} must be integers.`});
                break;
        };
    };

    //Validate if every field is between the numbers that must to be.
    const now = new Date();
    const newDate = new Date(year,month-1, day, 0,0,0,1);

    if (now >= newDate) next({statusCode: 400, message: "The appointment cannot be today or a past date."});
    if (newDate.getDay() === 6 || newDate.getDay() === 0) next({statusCode: 400, message: "The appointment cannot be scheduled on a weekend."});
    if (now.getFullYear() !== newDate.getFullYear()) next({statusCode: 400, message: "The appointment must be scheduled for the current year."});


    //Validations for time.
    const splitTime: string[] = time.split(":");
    const newTime: number[] = splitTime.map((num) => Number(num));

    if (newTime.length !== 2) next({statusCode: 400, message: "The time format is incorrect. Try HH:MM"});

    const hour = newTime[0];
    const min = newTime[1];
    const errTime: string[] = [];

    if (!hour) errTime.push("hour");
    if (!min && min !== 0) errTime.push("minutes");
    if (errTime.length == 1)  next({statusCode: 400, message: `The ${errTime[0]} must be a number.`});
    if (errTime.length == 2)  next({statusCode: 400, message: `The ${errTime[0]} and ${errTime[1]} must be numbers.`});

    const errInteger: string[] = [];

    if(!Number.isInteger(hour)) errInteger.push("hour");
    if(!Number.isInteger(min) && min !== 0) errInteger.push("minutes");
    if (errInteger.length == 1) next({statusCode: 400, message: `The ${errInteger[0]} must be an integer.`});
    if (errInteger.length == 2) next({statusCode: 400, message: `The ${errInteger[0]} and ${errInteger[1]} must be integers.`});

    if ((hour < 8 || hour > 18) || (hour === 18 && min === 30)) next({statusCode: 400, message: "Appointments must be scheduled between 8:00 and 18:00."}); 
    if (min !== 0 && min !== 30) next({statusCode: 400, message: "Appointments must be scheduled at full hours or half-past."}); 

    next();
};

export default formatAppointment;