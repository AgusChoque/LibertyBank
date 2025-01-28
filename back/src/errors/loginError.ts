import DataError from "./dataError";

class LoginError extends DataError{
    login: boolean;
    constructor(login: boolean, statusCode: number, message: string) {
        super(statusCode, message);
        this.name = "LoginError";
        this.login = login
    };
};

export default LoginError;