// main.ts
import './telemetry';
import { buildApp } from './app';

async function start() {
    const app = await buildApp();
    app.listen({ port: 3000 }, (err) => {
        if (err) throw err;
        console.log('🚀 Server listening on http://localhost:3000');
    });
}

start();
