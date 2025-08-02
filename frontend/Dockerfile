FROM node:20-alpine as build

ARG REACT_APP_SERVICES_HOST=/api

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
