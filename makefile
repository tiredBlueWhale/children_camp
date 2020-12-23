include .env
export

DOCKER_COMPOSE_DEV = docker-compose

restart: #Stop running container -> delete container ->
	docker rm ${CONTAINER_NAME} && docker volume rm couchdb_data -f && ${DOCKER_COMPOSE_DEV} up

start:
	${DOCKER_COMPOSE_DEV} up

stop:
	docker stop ${CONTAINER_NAME}