FROM node:alpine

WORKDIR /usr/api

COPY package*.json .

RUN npm install

COPY . /usr/api/

EXPOSE 3000

CMD ["npm", "run", "start:dev"]


