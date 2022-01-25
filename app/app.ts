import { Application } from "https://deno.land/x/oak/mod.ts"
import { routeNotFound, errorHandler } from "./errors.ts"
import { logger } from "./logger.ts"
import router from "./router.ts"

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

await app.listen({ port: 8000 })