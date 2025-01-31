import express from "express";
import mainRouter from "./routes";
import errorHandler from "./errors";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/", mainRouter);
app.use(errorHandler);

export default app