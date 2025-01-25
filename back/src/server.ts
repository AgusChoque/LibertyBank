import express from "express";
import { Request, Response, NextFunction } from "express";
import mainRouter from "./routes";
import errorDto from "./dto/errorDto";

const app = express();

app.use(express.json());

app.use("/", mainRouter);
app.use((err: errorDto, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        login: err.login,
        error: err.message
    });
});

export default app