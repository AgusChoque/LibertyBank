import express from "express";
import mainRouter from "./routes";
import errorHandler from "./errors";

const app = express();

app.use(express.json());

app.use("/", mainRouter);
app.use(errorHandler);

export default app