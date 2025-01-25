import app from "./server";
import {PORT} from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import preloadData from "./helpers/preloadData";

const appInitialize = async () => {
    await AppDataSource.initialize()
    console.log("Database connected successfully.");
    await preloadData();
    app.listen(PORT,() => {
        console.log(`Server listening on port: ${PORT}`);
    });
};

appInitialize();