#!/usr/bin/env bash

aws ecr get-login-password --profile snfl-discord-alerts --region us-east-1 | docker login --username AWS --password-stdin 733454354601.dkr.ecr.us-east-1.amazonaws.com
docker build -t er/cb .
docker tag er/cb:latest 733454354601.dkr.ecr.us-east-1.amazonaws.com/er/cb:latest
docker push 733454354601.dkr.ecr.us-east-1.amazonaws.com/er/cb:latest
aws ecs update-service --cluster se-er-cluster --service snfl-discord-alerts-cluster --force-new-deployment > push_to_AWS.production.log
