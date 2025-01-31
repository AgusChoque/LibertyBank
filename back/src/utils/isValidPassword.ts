const isValidPassword = (pass: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_-]).{8,}$/;
    return regex.test(pass);
};

export default isValidPassword;