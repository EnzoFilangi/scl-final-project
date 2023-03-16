import express, {Router} from 'express';
import {longRunningTaskRouteFactory} from "./routes/long-running-task.route";
import {Kafka} from "kafkajs";

export const router = express.Router()

export function registerRoutes(router: Router, kafka: Kafka, topicName: string){
    router.post("/long-running-task", longRunningTaskRouteFactory(kafka, topicName))
}