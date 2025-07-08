# Stage 1: Build da aplicação com Node
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências para cache
COPY package*.json ./

# Instala dependências
RUN npm install --legacy-peer-deps

# Copia o restante do código
COPY . .

# Executa o build de produção do Vite
RUN npm run build


# Stage 2: Serve os arquivos estáticos com NGINX
FROM nginx:stable-alpine

# Copia os arquivos gerados para o diretório padrão do nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração customizado do nginx (você pode criar este arquivo para SPA)
COPY default.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 para acesso externo
EXPOSE 80

# Comando padrão para rodar o NGINX em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
