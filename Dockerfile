FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY frontend/package.json frontend/yarn.lock ./

COPY frontend ./

EXPOSE 3000

RUN yarn build