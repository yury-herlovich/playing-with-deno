run:
	docker-compose up

debug:
	docker-compose -f docker-compose.yml -f docker-compose.debug.yml up

test-app:
	docker-compose -f docker-compose.yml -f docker-compose.test.yml up
