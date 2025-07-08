# Etapa 1: Base para build (dev e prod)
FROM node:20 AS base

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Etapa 2: Desenvolvimento
FROM base AS dev

EXPOSE 5173

CMD ["npm", "run", "dev"]

# Etapa 3: Produção
FROM base AS build

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Etapa 4: Servidor para produção
FROM node:20-alpine AS prod

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 80

CMD ["serve", "dist"]
