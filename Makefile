.PHONY: up down logs bash backend frontend db

up:
	docker-compose up -d --build

down:
	docker-compose down

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

bash-backend:
	docker-compose exec backend bash

bash-frontend:
	docker-compose exec frontend sh

migrate:
	docker-compose exec backend php bin/console doctrine:migrations:migrate

create-db:
	docker-compose exec backend php bin/console doctrine:database:create
