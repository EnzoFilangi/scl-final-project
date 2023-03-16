import express, {Router} from 'express';
import {longRunningTaskRouteFactory} from "./routes/long-running-task.route";
import {Kafka} from "kafkajs";
import {ResponseTopicListenerManager} from "../listener/response-topic-listener-manager";

export const router = express.Router()

export function registerRoutes(router: Router, kafka: Kafka, topicName: string, responseTopicListenerManager: ResponseTopicListenerManager){
    router.post("/long-running-task", longRunningTaskRouteFactory(kafka, topicName, responseTopicListenerManager))
}