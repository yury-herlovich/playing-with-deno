# Playing with Deno

## Requirements

- Deno 1.20.0+
- VSCode with deno extension or other code editor
- Docker and docker-compose
- Bonus: VSCode extension Rest Client to support requests from text file
  - `cp api.http.sample api.http`

## Available commands

- start app - `deno task docker`
- debugging - `deno task docker:debug`
- tests - `deno task test`
- compile - `deno task compile:apple` or `deno task compile:linux`
- build release docker image - `deno task docker:build:release`
- start release docker image - `deno task docker:release`

### Tricks

- extract and export env variables and start app (con be error with Mongo connection, not solved yet for local DB) -
  `export $(xargs --arg-file=.env) && ./app`

## Endpoint

### GET /health-check

`curl http://localhost:8000/health-check`

### GET /users

`curl http://localhost:8000/users`

### GET /users/:id

`curl http://localhost:8000/users/:id`

### POST /users

`curl --request POST -d '{ "name": "Yury", "email": "yury@example.com", "role": "admin" }' -H 'Content-Type: application/json' "http://localhost:8000/users"`

### PUT /users/:id

`curl --request PUT -d '{ "name": "Yury", "email": "yury@example.com", "role": "admin" }' -H 'Content-Type: application/json' "http://localhost:8000/users/:id"`

### PATCH /users/:id

`curl --request PATCH -d '{ "role": "user" }' -H 'Content-Type: application/json' "http://localhost:8000/users/:id"`

### DELETE /users/:id

`curl --request DELETE "http://localhost:8000/users/:id"`
