# Playing with Deno

## Requirements

- Deno 1.20.0+
- VSCode with deno extension or other code editor
- Docker and docker-compose
- Bonus: VSCode extension Rest Client to support requests from text file
  - `cp api.http.sample api.http`

## Available commands

- start app - `make run`
- debugging - `make debug`
- tests - `make test-app` - not finished, it needs more investigations how to
  use oak typings
- compile - `make compile` or `make compile-linux`
- build release docker image - `make build-release`
- start release docker image - `make run-release`

### Tricks

- extract and export env variables and start app -
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
