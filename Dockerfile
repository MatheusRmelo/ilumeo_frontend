FROM node:latest
WORKDIR /src/client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
