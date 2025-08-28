import * as Sentry from "@sentry/node"

Sentry.init({
    dsn: process.env.SENTRY_DSN || 'https://2e03da21056a05d01de49991800cfe1d@o4509914680066048.ingest.de.sentry.io/4509914690945104',
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    environment: process.env.NODE_ENV || 'development',
    includeLocalVariables: true,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,

});

