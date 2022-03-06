# Playing with Deno

## Commands
- start app - `make run`
- debugging - `make debug`
- tests - `make test-app` - not finished, it needs more investigations how to use oak typings

## Endpoint
### GET /health-check
`curl http://localhost:8000/health-check`

### GET /users
`curl http://localhost:8000/users`

### GET /users/:id
`curl http://localhost:8000/users/:id`

### POST /users
`curl --request POST -d '{ "name": "Yury", "age": "30", "role": "admin" }' -H 'Content-Type: application/json' "http://localhost:8000/users"`

### PUT /users/:id
`curl --request PUT -d '{ "name": "Yury", "age": "30", "role": "admin" }' -H 'Content-Type: application/json' "http://localhost:8000/users/:id"`

### PATCH /users/:id
`curl --request PATCH -d '{ "role": "user" }' -H 'Content-Type: application/json' "http://localhost:8000/users/:id"`

### DELETE /users/:id
`curl --request DELETE "http://localhost:8000/users/:id"`