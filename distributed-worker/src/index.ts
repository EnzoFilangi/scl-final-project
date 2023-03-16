import dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

import {Kafka, logLevel} from "kafkajs";
import { v4 as uuidv4 } from 'uuid';
import {longRunningTaskListenerFactory} from "./listeners/long-running-task.listener";

const processIdentifier = process.env.CLIENT_ID_RADICAL + uuidv4();
const kafka: Kafka = new Kafka({
    clientId: processIdentifier,
    brokers: [process.env.KAFKA_ADDRESS],
    logLevel: logLevel.NOTHING
});
const topicName = process.env.TOPIC_NAME;
const responseTopicName = process.env.RESPONSE_TOPIC_NAME;

longRunningTaskListenerFactory(kafka, topicName, responseTopicName, processIdentifier)();