FROM denoland/deno:alpine-1.20.1 as builder

WORKDIR /usr/src
COPY ./src ./src
COPY deno.json ./
RUN ls -la
RUN deno task compile:linux


FROM debian:stable-slim

WORKDIR /usr/src
COPY --from=builder /usr/src/app /usr/bin/

ENTRYPOINT [ "/usr/bin/app" ]
