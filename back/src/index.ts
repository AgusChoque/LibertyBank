import app from "./server";
import {PORT} from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import preloadData from "./helpers/preloadData";
import transporter from "./config/transporter";

const appInitialize = async () => {
    await AppDataSource.initialize()
    console.log("Database connected successfully.");
    await preloadData();
    await transporter.verify();
    console.log("Mail connected successfully.");
    app.listen(PORT,() => {
        console.log(`Server listening on port: ${PORT}`);
    });
};

appInitialize();