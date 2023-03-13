import dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

import express, {NextFunction, Request, Response} from "express";

import {AppDataSource} from "./persistence/database";
import {router, registerRoutes} from "./api/api";

Promise.all([
    AppDataSource.initialize()
]).then(() => {
    console.log("Database connected")

    const app = express();
    app.set('trust proxy', 1);

    // Ensure the caller has the right to use the API
    app.use((req: Request, res: Response, next: NextFunction) => {
        const permissionCookieValue = req.cookies[process.env.PERMISSION_COOKIE_NAME];

        if (!permissionCookieValue) {
            res.sendStatus(400);
            return;
        }

        if (permissionCookieValue !== process.env.PERMISSION_COOKIE_VALUE) {
            res.sendStatus(401);
            return;
        }

        next();
    })

    // Parse request body as json
    app.use(express.json());

    // Configuration des routes
    registerRoutes(router, AppDataSource)
    app.use(router)

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Product service is running on port ${port}.`);
    });
})