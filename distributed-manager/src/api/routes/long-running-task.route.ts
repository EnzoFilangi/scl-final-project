import {Request, Response} from "express";
import {Kafka} from "kafkajs";

import { v4 as uuidv4 } from 'uuid';
import {ResponseTopicListenerManager} from "../../listener/response-topic-listener-manager";

export function longRunningTaskRouteFactory(kafka: Kafka, topicName: string, responseTopicListenerManager: ResponseTopicListenerManager){
    return async (req: Request, res: Response) => {
        const body: { text ?: string } = req.body;
        if (!body.text || typeof body.text !== 'string'){
            res.sendStatus(400);
            return;
        }

        const producer = kafka.producer();
        await producer.connect();
        try {
            const messageKey = uuidv4();
            responseTopicListenerManager.waitForResponse(messageKey, res);
            const message = {text: body.text, messageKey: messageKey}
            await producer.send({
                topic: topicName,
                messages: [
                    { value: JSON.stringify(message) },
                ],
            });
        } catch (e) {
            await producer.disconnect();
            res.sendStatus(500);
            return;
        }
        await producer.disconnect();
    }
}