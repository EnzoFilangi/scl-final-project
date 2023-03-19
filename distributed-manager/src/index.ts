import dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

import {Kafka, logLevel} from "kafkajs";
import express from "express";
import {registerRoutes, router} from "./api/api";
import {ResponseTopicListenerManager} from "./listener/response-topic-listener-manager";

const kafka: Kafka = new Kafka({
    clientId: process.env.CLIENT_ID,
    brokers: [process.env.KAFKA_ADDRESS]
});
const topicName = process.env.TOPIC_NAME;
const responseTopicName = process.env.RESPONSE_TOPIC_NAME;

const responseTopicListenerManager = new ResponseTopicListenerManager();
responseTopicListenerManager.startListening(kafka, responseTopicName).then(() => {
    const app = express();
    app.set('trust proxy', 1);

    // Parse request body as json
    app.use(express.json());

    registerRoutes(router, kafka, topicName, responseTopicListenerManager)
    app.use(router)

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Distributed manager service is running on port ${port}.`);
    });
})