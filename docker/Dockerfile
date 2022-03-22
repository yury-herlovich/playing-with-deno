FROM denoland/deno:alpine-1.20.1 as builder

WORKDIR /usr/src
COPY ./src deno.json ./
RUN cat deno.json
RUN deno compile --allow-env --allow-net --target x86_64-unknown-linux-gnu ./app.ts app


FROM debian:stable-slim

WORKDIR /usr/src
COPY --from=builder /usr/src/app /usr/bin/

ENTRYPOINT [ "/usr/bin/app" ]
