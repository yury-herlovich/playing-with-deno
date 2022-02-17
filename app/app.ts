import { Application } from "./deps.ts";
import { routeNotFound, errorHandler } from './libs/errors.ts'
import { logger } from './libs/logger.ts'
import router from './router.ts'
import db from './libs/db.ts'

const app = new Application()

// Logger
app.use(logger)

// Errors
app.use(errorHandler)

// Routes
app.use(router.routes())
app.use(router.allowedMethods())

// not found
app.use(routeNotFound)

await db.connect()
await app.listen({ port: 8000 })

export default app
