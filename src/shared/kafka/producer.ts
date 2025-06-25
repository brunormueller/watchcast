import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'watch-stream',
    brokers: ['localhost:9092'] // ou use o endereço do seu broker Kafka
});

export const producer = kafka.producer();

export async function sendStreamEvent(event: {
    streamId: string;
    title: string;
    eventType: 'stream_started' | 'stream_ended';
}) {
    await producer.connect(); // só conecta se ainda não estiver conectado

    await producer.send({
        topic: 'stream-events',
        messages: [
            {
                key: event.streamId,
                value: JSON.stringify({
                    event: event.eventType,
                    title: event.title,
                    streamId: event.streamId,
                    timestamp: new Date().toISOString()
                })
            }
        ]
    });
}
