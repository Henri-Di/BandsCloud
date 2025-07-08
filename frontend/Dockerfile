# Etapa 1: Build do Vite
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG VITE_API_URL=https://bandscloud.onrender.com/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Etapa 2: Servidor com NGINX
FROM nginx:alpine AS prod

# Copia build para NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copia sua config personalizada
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
