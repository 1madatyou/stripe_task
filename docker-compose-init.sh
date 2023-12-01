#!/bin/bash
docker compose build
docker compose run --rm django sh /usr/src/backend/project/docker-start.sh