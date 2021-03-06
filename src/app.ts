import { Application } from './deps.ts';
import { errorHandler, routeNotFound } from './libs/errors.ts';
import { logger } from './libs/logger.ts';
import router from './router.ts';
import db from './libs/db.ts';

// listen and exit on ctrl+c
Deno.addSignalListener('SIGINT', () => Deno.exit());

const app = new Application();

// Logger
app.use(logger);

// Errors
app.use(errorHandler);

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// not found
app.use(routeNotFound);

await db.connect();

app.addEventListener('listen', ({ port }) => console.log(`Listening on port ${port}`));

app.listen({ port: 8000 });

export default app;
