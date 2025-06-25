// src/shared/kafka/producer.ts
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ clientId: 'watch-stream', brokers: ['localhost:9092'] });
export const producer = kafka.producer();

export async function sendStreamEvent(streamId: string, event: string) {
    await producer.connect();
    await producer.send({
        topic: 'stream-events',
        messages: [{ key: streamId, value: JSON.stringify({ event, streamId, timestamp: Date.now() }) }]
    });
}
