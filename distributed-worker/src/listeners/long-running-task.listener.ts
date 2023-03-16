import {EachMessagePayload, Kafka} from "kafkajs";

function taskFactory(processIdentifier: string){
    return async (payload: EachMessagePayload) => {
        const message: {text: string} = JSON.parse(payload.message.value.toString());

        const waitTime = Math.floor(Math.random() * 1000);
        await new Promise(r => setTimeout(r, waitTime));

        const returnValue = `Consumer ${processIdentifier} processed incoming message "${message.text}" in ${waitTime}ms.`
        console.log(returnValue)
    }
}

export function longRunningTaskListenerFactory(kafka: Kafka, topicName: string, processIdentifier: string){
    return async () => {
        console.info(`Creating consumer`)
        const consumer = kafka.consumer({groupId: 'consumer'});

        console.info(`Connecting consumer`)
        await consumer.connect();

        console.info(`Subscribing to topic ${topicName}`)
        await consumer.subscribe({topic: topicName})

        console.info(`Registering task`)
        await consumer.run({
            eachMessage: taskFactory(processIdentifier)
        })

        console.info(`Listener ${processIdentifier} ready`)
    }
}