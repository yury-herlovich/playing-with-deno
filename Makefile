run:
	docker-compose up

debug:
	docker-compose -f docker-compose.yml -f docker-compose.debug.yml up