run:
	docker-compose up

debug:
	docker-compose run -p 8000:8000 -p 9229:9229 --rm app deno run --inspect-brk=0.0.0.0:9229 --allow-net --allow-env src/app.ts

tests:
	docker-compose run --rm app deno test --allow-env --allow-net ./test

tests-watch:
	docker-compose run --rm app deno test --allow-env --allow-net --watch ./test

tests-debug:
	docker-compose run -p 9229:9229 --rm app deno test --allow-env --allow-net --watch --inspect-br:9229 ./test
