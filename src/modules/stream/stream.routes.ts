// src/modules/stream/stream.routes.ts
import { FastifyInstance } from 'fastify';
import {
    createStreamHandler,
    startStreamHandler,
    listLiveStreamsHandler
} from './stream.controller';

export async function streamRoutes(app: FastifyInstance) {
    app.post('/streams', { onRequest: [app.authenticate] }, createStreamHandler);
    app.post('/streams/:id/start', { onRequest: [app.authenticate] }, startStreamHandler);
    app.get('/streams/live', listLiveStreamsHandler);
}
