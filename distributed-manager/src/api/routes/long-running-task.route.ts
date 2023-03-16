import {Request, Response} from "express";
import {Kafka} from "kafkajs";

export function longRunningTaskRouteFactory(kafka: Kafka, topicName: string){
    return async (req: Request, res: Response) => {
        const body: { text ?: string } = req.body;
        if (!body.text || typeof body.text !== 'string'){
            res.sendStatus(400);
            return;
        }

        const producer = kafka.producer();
        await producer.connect();
        try {
            await producer.send({
                topic: topicName,
                messages: [
                    { value: JSON.stringify({text: body.text}) },
                ],
            });
        } catch (e) {
            res.sendStatus(500);
            return;
        }

        res.sendStatus(200);
    }
}