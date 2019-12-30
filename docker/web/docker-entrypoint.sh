#!/bin/sh

set -e

host="$1"

echo $NODE_ENV

until yarn migration:run -f config/orm/docker.json; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec yarn dev:docker