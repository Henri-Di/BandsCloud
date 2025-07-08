# Etapa de desenvolvimento (dev)
FROM node:20 AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]


# Etapa de build para produção (build estático)
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG VITE_API_URL=https://bandscloud.onrender.com/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# Etapa final - produção - NGINX serve o build estático
FROM nginx:alpine AS prod

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
