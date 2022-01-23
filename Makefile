run:
	docker-compose up app

debug:
	docker-compose -f docker-compose.yml -f docker-compose.debug.yml up app