// src/telemetry.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({
        url: 'http://localhost:4318/v1/traces' // Jaeger
    }),
    instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();
