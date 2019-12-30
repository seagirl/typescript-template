# PROJECT_NAME

> PROJECT_NAME JSON API

## Build Setup

``` bash
# install dependencies
$ yarn install

# createdb
$ createdb -U www PROJECT_NAME

# migration
$ yarn migration:run -f config/orm/local.json

# serve with hot reload at localhost:3000
$ yarn dev
```

## Shared Development Server

```bash
# build
$ yarn build

# start server with pm2 (see package.json)
$ yarn start
```

## Production

```bash
# build
$ yarn build

# start server with pm2 (see package.json)
$ yarn start:production

# list
$ yarn pm2 list

# stop
$ yarn pm2 stop {APP_NAME}

# restart
$ yarn pm2 restart {APP_NAME}

# logs
$ yarn pm2 logs {APP_NAME}

# delete
$ yarn pm2 delete {APP_NAME}
```

## Docker

<!-- ```
% docker login dr.esuni.jp # ID/PW は GitLab のアカウント
% docker-compose up
``` -->

### Docker イメージのビルド

<!-- ```
# DB サーバー
docker build -t dr.esuni.jp/esuni/PROJECT_NAME/db -f docker/db/Dockerfile .
docker push dr.esuni.jp/esuni/PROJECT_NAME/db

# WEB サーバー
docker build -t dr.esuni.jp/esuni/PROJECT_NAME/web -f docker/web/Dockerfile .
docker push dr.esuni.jp/esuni/PROJECT_NAME/web
``` -->
