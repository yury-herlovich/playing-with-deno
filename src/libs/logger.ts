import { OakContext } from '../typing.ts';

// Logger
export async function logger(ctx: OakContext, next: Function) {
  const start = Date.now();
  await next();

  console.log(
    ctx.request.method,
    ctx.request.url.pathname,
    ctx.response.status,
    `${Date.now() - start}ms`,
    JSON.stringify(ctx.response.body),
  );
}

export function logError(err: Error) {
  console.log(`${err.name}:`, err.message);
}
