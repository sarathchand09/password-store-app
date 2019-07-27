### STAGE 1: Build ###
FROM node:8.7.0-alpine as build

COPY package*.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /app && mv ./node_modules ./app

WORKDIR ./app

COPY . .

RUN npm run build

### STAGE 2: Setup ###
FROM node:8.7.0-alpine

COPY --from=build /app/build /usr/src/app

WORKDIR /usr/src/app


