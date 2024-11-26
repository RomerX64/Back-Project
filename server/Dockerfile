FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev


COPY ./package*.json ./
COPY . .

RUN npm run build 


EXPOSE 3000

CMD ["npm", "run", "start:prod"]
