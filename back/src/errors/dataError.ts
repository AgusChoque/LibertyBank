class DataError extends Error{
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.name = "DataError";
        this.statusCode = statusCode;
    };
};

export default DataError;