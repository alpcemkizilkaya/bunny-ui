FROM node:current-alpine3.10 as generator
WORKDIR /app/src
COPY ./package.json /app/src
RUN npm install
COPY . /app/src

FROM generator as builder
WORKDIR /app/src
RUN npm run build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/src/dist .
EXPOSE 80
