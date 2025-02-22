export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      // Initialize Sentry first
      const Sentry = await import('@sentry/nextjs');
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        tracesSampleRate: 1.0,
        environment: process.env.NODE_ENV,
      });

      // Then initialize OpenTelemetry
      const { NodeSDK } = await import('@opentelemetry/sdk-node');
      const { Resource } = await import('@opentelemetry/resources');
      const { SemanticResourceAttributes } = await import('@opentelemetry/semantic-conventions');
      const { getNodeAutoInstrumentations } = await import('@opentelemetry/auto-instrumentations-node');

      const sdk = new NodeSDK({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: 'arty-stone-clinic',
          [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
          [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
        }),
        instrumentations: [getNodeAutoInstrumentations()],
      });

      sdk.start();
    } catch (e) {
      console.error('Failed to initialize instrumentation:', e);
    }
  }
} 