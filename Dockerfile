### STAGE 1: Build ###
FROM node:8.7.0-alpine as build

COPY package*.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /app && mv ./node_modules ./app

WORKDIR ./app

COPY . .

RUN npm run build

### STAGE 2: Setup ###
FROM nginx:1.14.1-alpine

## Copy our default nginx config
#COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]