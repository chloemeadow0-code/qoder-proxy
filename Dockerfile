FROM node:24-slim

WORKDIR /src

RUN npm install -g @qodercn-ai/qoderclicn

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "clean/server.js"]