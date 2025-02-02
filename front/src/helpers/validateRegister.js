const validateRegister = ({name, email, birthdate, nDni, username, password}) => {
    const errors = {};

    //Validations for name.
    if(!name) errors.name = "It's required";
    if((name.length > 50 || name.length < 8) && name.length !== 0) errors.name = "Must have between 8 and 50 characters."

    //Validations for email.
    if(!email) errors.email = "It's required";
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regexMail.test(email)) errors.email = "Email invalid";

    //Validations for birthdate.
    if(!birthdate) errors.birthdate = "It's required";

    const newDate = new Date(birthdate)
    const dateLimit = new Date();
    dateLimit.setFullYear(dateLimit.getFullYear() - 18);
    if (newDate > dateLimit) errors.birthdate = "You must have at least 18 years old"

    //Validations for nDni.
    if(!nDni) errors.nDni = "It's required";
    if(nDni < 20000000 || nDni > 50000000) errors.nDni = "Must be between 20M and 50M"
    
    //Validations for username.
    if(!username) errors.username = "It's required";
    if(username.length < 5) errors.username = "Must have at least 5 characters"

    const noSpaces = username.split("").filter((char) => {if(char === " "){return char}});
    if (noSpaces.length) errors.username = "Mustn't have spaces"
    
    //Validations for password.
    if(!password) errors.password = "It's required";
    if(password.length < 8) errors.password = "Must have at least 8 characters";

    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_-]).{8,}$/;
    if(!regexPass.test(password)) errors.password = "Must contain at least one lowercase letter, one uppercase letter, one number, and one special character"

    return errors;
};

export default validateRegister;