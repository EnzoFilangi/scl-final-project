import dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

import express from 'express';
import {helloWorld} from "./routes/hello-world.route";

const app = express();
app.set('trust proxy', 1);

app.get("/hello", helloWorld)

const port = process.env.PORT
app.listen(port, () => {
    console.log("Hello service listening on port " + port)
})