#!/bin/sh
# sleep-for-nginx.sh

# Wait a bit for other services to be ready
sleep 10

# Execute the Docker entrypoint's original command
exec docker-entrypoint.sh nginx -g 'daemon off;'
