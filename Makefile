include .env

args = $(filter-out $@,$(MAKECMDGOALS))
current_dir = $(notdir $(shell pwd))
dir = $(subst #,,${current_dir})

upd:
	docker-compose up -d

up:
	make && make logs

down:
	docker-compose down

stop:
	docker-compose stop

restart:
	docker-compose restart

build:
	docker-compose build --no-cache ${args}

logs:
	docker-compose logs -f

sh:
	docker-compose run --rm app sh

prod:
	docker-compose run --rm app

test:
	docker-compose run --rm app npm run test

coverage:
	docker-compose run --rm app npm run coverage

# This allows us to accept extra arguments (by doing nothing when we get a job that doesn't match, rather than throwing an error).
%:
	@:

rm:
	docker rmi ${dir}-${args}

.PHONY: upd up down stop restart build logs sh prod test coverage rm
