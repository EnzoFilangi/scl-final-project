import {Response} from "express";
import {Kafka} from "kafkajs";

import { v4 as uuidv4 } from 'uuid';

export class ResponseTopicListenerManager {
    awaitingResponses: Map<string, Response>;
    groupId: string;

    waitForResponse(messageKey: string, response: Response){
        this.awaitingResponses.set(messageKey, response);
    }

    async startListening(kafka: Kafka, responseTopicName: string){
        const consumer = kafka.consumer({groupId: this.groupId});
        await consumer.connect();
        console.info(`Consumer connected to group ${this.groupId}`);

        await consumer.subscribe({topic: responseTopicName})
        console.info(`Consumer subscribed to topic ${responseTopicName}`)

        await consumer.run({
            eachMessage: async payload => {
                const receivedMessage: {text: string, messageKey: string} = JSON.parse(payload.message.value.toString());
                const res = this.awaitingResponses.get(receivedMessage.messageKey)
                if (res){
                    this.awaitingResponses.delete(receivedMessage.messageKey);
                    res.json({text: receivedMessage.text});
                }
            }
        })
        console.info(`Consumer ready to receive responses`)
    }

    constructor(groupId: string = uuidv4()) {
        this.awaitingResponses = new Map();
        this.groupId = groupId;
    }
}