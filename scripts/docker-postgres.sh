#!/bin/sh

start() {
  docker run \
    --name nest-pg \
    --rm -d \
    -p 5432:5432 \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=postgres \
    postgres:9.6
}

stop() {
  docker stop nest-pg
}

"$@"
