import dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

import {Kafka} from "kafkajs";
import { v4 as uuidv4 } from 'uuid';
import {longRunningTaskListenerFactory} from "./listeners/long-running-task.listener";

const processIdentifier = process.env.CLIENT_ID_RADICAL + uuidv4();
const kafka: Kafka = new Kafka({
    clientId: processIdentifier,
    brokers: [process.env.KAFKA_ADDRESS]
});
const topicName = process.env.TOPIC_NAME;

longRunningTaskListenerFactory(kafka, topicName, processIdentifier)();