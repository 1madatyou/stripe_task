FROM node:18.18-bookworm

WORKDIR /usr/src/frontend/project

COPY ./project/package*.json .

ARG API_DOMAIN_NAME
ENV REACT_APP_API_DOMAIN_NAME=$API_DOMAIN_NAME

RUN npm install

COPY . /usr/src/frontend

RUN npm run build