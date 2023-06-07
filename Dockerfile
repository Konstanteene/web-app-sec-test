
FROM node:14

# Визначити папку проекту
WORKDIR /app

# Копіювання залежностей
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
