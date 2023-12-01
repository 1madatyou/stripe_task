FROM node:18.18-bookworm

WORKDIR /usr/src/frontend/project

COPY ./project/package*.json .

RUN npm install

COPY . /usr/src/frontend

RUN npm run build