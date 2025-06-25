// src/shared/kafka/consumer.ts
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'watch-stream-consumer',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'watch-stream-group' });

export async function startKafkaConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'stream-events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
            const value = message.value?.toString();

            try {
                const payload = JSON.parse(value || '{}');
                console.log(`${prefix} - Event received:`, payload);

                // 👉 Aqui você pode reagir ao evento
                if (payload.event === 'stream_started') {
                    console.log(`🎥 Stream iniciada: ${payload.title} (ID: ${payload.streamId})`);
                }
            } catch (err) {
                console.error(`❌ Erro ao processar mensagem Kafka:`, err);
            }
        }
    });
}
