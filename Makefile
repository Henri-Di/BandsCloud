.PHONY: up down logs logs-backend logs-frontend bash-backend bash-frontend migrate create-db shell test clear-cache build-frontend dev-frontend migrate-reset

# Sobe todos os containers em background e reconstrói a imagem
up:
	docker-compose up -d --build

# Para e remove todos os containers, redes e volumes anônimos
down:
	docker-compose down

# Exibe logs de todos os containers, em modo follow (tempo real)
logs:
	docker-compose logs -f

# Exibe logs em tempo real do backend
logs-backend:
	docker-compose logs -f backend

# Exibe logs em tempo real do frontend
logs-frontend:
	docker-compose logs -f frontend

# Abre shell bash no container backend
bash-backend:
	docker-compose exec backend bash

# Abre shell sh no container frontend (geralmente alpine-based)
bash-frontend:
	docker-compose exec frontend sh

# Executa as migrations do Doctrine no backend
migrate:
	docker-compose exec backend php bin/console doctrine:migrations:migrate --no-interaction

# Cria o banco de dados via console Symfony (não dá erro se já existir)
create-db:
	docker-compose exec backend php bin/console doctrine:database:create --if-not-exists

# Abre shell interativa em qualquer container (exemplo: make shell container=backend)
shell:
ifndef container
	$(error "Você deve informar o container, exemplo: make shell container=backend")
endif
	docker-compose exec $(container) sh

# Executa os testes PHP do backend (PHPUnit)
test:
	docker-compose exec backend php ./vendor/bin/phpunit

# Limpa o cache do Symfony no backend (prod e dev)
clear-cache:
	docker-compose exec backend php bin/console cache:clear
	docker-compose exec backend php bin/console cache:warmup

# Executa build de produção do frontend React
build-frontend:
	docker-compose exec frontend npm install
	docker-compose exec frontend npm run build

# Roda o servidor frontend em modo desenvolvimento (Vite)
dev-frontend:
	docker-compose exec frontend npm install
	docker-compose exec frontend npm run dev

# Reseta todas as migrations (cuidado: apaga dados!)
migrate-reset:
	docker-compose exec backend php bin/console doctrine:migrations:migrate --no-interaction --reset
