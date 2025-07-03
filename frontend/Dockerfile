# Utiliza imagem oficial do Node.js
FROM node:20

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (para otimizar cache)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta padrão do Vite (dev server)
EXPOSE 5173

# Inicia o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
