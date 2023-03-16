import dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

import express from 'express';
import cookieParser from "cookie-parser";
import {registerRoutes, router} from "./api/api";

const app = express();
app.set('trust proxy', 1);

app.use(cookieParser());

// Parse request body as json
app.use(express.json());

registerRoutes(router)
app.use(router)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Gateway service is running on port ${port}.`);
});