# Use the official NGINX image as a parent image
FROM nginx:latest

# Set environment variables for dockerize version
ENV DOCKERIZE_VERSION v0.6.1

# Download and install dockerize
RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Copy custom configuration files (if any)
# COPY ./nginx/conf /etc/nginx/conf.d
# COPY ./nginx/ssl /etc/ssl/certs

# The command to run when the container starts
CMD ["sh", "-c", "dockerize -wait tcp://api:3001 -wait tcp://auth:3000 -timeout 60s && nginx -g 'daemon off;'"]
