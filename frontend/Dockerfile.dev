# Dockerfile.dev - frontend (desenvolvimento)

FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências (use --legacy-peer-deps se precisar)
RUN npm install --legacy-peer-deps

# Copia o restante do código
COPY . .

# Exponha a porta do Vite (padrão 5173)
EXPOSE 5173

# Comando para rodar o Vite no modo dev com hot reload
CMD ["npm", "run", "dev"]
