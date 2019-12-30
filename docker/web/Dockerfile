FROM node:12.10-alpine

RUN apk update && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

RUN mkdir -p /data/www
COPY . /data/www/app

WORKDIR /data/www/app
RUN yarn install

EXPOSE 3000

ENTRYPOINT ["./docker/web/docker-entrypoint.sh"]