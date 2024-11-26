FROM node:18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install --omit=dev

COPY ./server/ .

EXPOSE 3000

CMD ["npm", "run", "start"]
