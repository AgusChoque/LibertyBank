const validateSchedule = ({date, time, subject}) => {
    const errors = {};

    //Validate date.
    if(!date) errors.date = "It's required";

    const newDate = new Date(date);
    const dateMax = new Date();
    const dateMin = new Date();
    dateMax.setFullYear(dateMax.getFullYear() + 1);
    dateMin.setDate(dateMin.getDate() + 1);
    if(newDate < dateMin || newDate > dateMax) errors.date = "It must be a date between tomorrow and one year";
    if (newDate.getDay() === 0 || newDate.getDay() === 6) errors.date = "Mustn't be scheduled on a weekend"

    //Validate time.
    if(!time) errors.time = "It's required";

    const [hour, min] = time.split(":").map(Number);
    if((hour < 8 || hour > 18) || (hour === 18 && min !== 0)) errors.time = "Must be scheduled between 8:00 and 18:00";
    if(min !== 0 && min !== 30) errors.time = "Must be scheduled at full hours or half-past";

    //Validate subject.
    if(!subject || subject == "Default") errors.subject = "It's required";

    return errors;
};

export default validateSchedule;