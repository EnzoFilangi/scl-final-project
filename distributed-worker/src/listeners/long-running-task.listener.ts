import {EachMessagePayload, Kafka} from "kafkajs";

function taskFactory(kafka: Kafka, responseTopicName: string, processIdentifier: string){
    return async (payload: EachMessagePayload) => {
        const message: {text: string, messageKey: string} = JSON.parse(payload.message.value.toString());

        const waitTime = Math.floor(Math.random() * 1000);
        await new Promise(r => setTimeout(r, waitTime));

        const returnValue = `Consumer ${processIdentifier} processed incoming message "${message.text}" in ${waitTime}ms.`

        const producer = kafka.producer();
        await producer.connect();
        console.info(`Sending response to topic ${responseTopicName}, value : ${returnValue}`)
        await producer.send({
            topic: responseTopicName,
            messages: [
                { value: JSON.stringify({text: returnValue, messageKey: message.messageKey}) },
            ],
        });
        await producer.disconnect();
    }
}

export function longRunningTaskListenerFactory(kafka: Kafka, topicName: string, responseTopicName:string, processIdentifier: string){
    return async () => {
        console.info(`Creating consumer`)
        const consumer = kafka.consumer({groupId: 'consumer'});

        console.info(`Connecting consumer`)
        await consumer.connect();

        console.info(`Subscribing to topic ${topicName}`)
        await consumer.subscribe({topic: topicName})

        console.info(`Registering task`)
        await consumer.run({
            eachMessage: taskFactory(kafka, responseTopicName, processIdentifier)
        })

        console.info(`Listener ${processIdentifier} ready`)
    }
}