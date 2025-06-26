// src/modules/stream/stream.routes.ts
import { FastifyInstance } from 'fastify';
import {
    createStreamHandler,
    startStreamHandler,
    listLiveStreamsHandler
} from './stream.controller';
import { startStreamSchema, streamsSchema } from './stream.schema';

export async function streamRoutes(app: FastifyInstance) {
    app.post('/streams', { schema: streamsSchema, onRequest: [app.authenticate] }, createStreamHandler);
    app.post('/streams/:id/start', { schema: startStreamSchema, onRequest: [app.authenticate] }, startStreamHandler);
    app.get('/streams/live', listLiveStreamsHandler);
}
