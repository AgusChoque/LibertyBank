import app from "./server";
import {PORT} from "./config/envs";

app.listen(PORT,() => {
    console.log(`Server listening on port: ${PORT}`);
});