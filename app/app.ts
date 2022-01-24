import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { logger } from "./logger.ts"
import router from "./router.ts"

const app = new Application();

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Logger
app.use(logger);

app.use((ctx: Context) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });