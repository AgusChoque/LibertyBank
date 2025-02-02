const validateLogin = ({username, password}) => {
    const errors = {};

    //Validations for username.
    if(!username) errors.username = "It's required.";
    if(username.length < 5) errors.username = "It must have at least 5 characters.";

    //Validations for password.
    if(!password) errors.password = "It's required.";
    if(password.length < 8) errors.password = "It must have at least 8 characters.";

    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_-]).{8,}$/;
    if(!regexPass.test(password)) errors.password = "It must have at least one lowercase letter, one uppercase letter, one number and one special character.";

    return errors;
};

export default validateLogin;