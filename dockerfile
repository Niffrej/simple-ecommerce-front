# Use uma imagem base do Node.js
FROM node:18-alpine AS build

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Construa a aplicação
RUN npm run build

# Servidor Nginx para servir a aplicação estática
FROM nginx:alpine

# Copie os arquivos de build do React para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
