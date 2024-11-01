# Environment to install flutter and build web
FROM ubuntu:22.04

# Install required packages
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y curl git unzip xz-utils zip libglu1-mesa wget gpg apt-transport-https ca-certificates sudo

# Create flutter user and group
RUN useradd -m -s /bin/bash flutter && \
    echo "flutter:toor" | chpasswd && \
    adduser flutter sudo

# Install and setup Flutter
RUN mkdir -p /home/flutter/flutter && \
    wget -q https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.24.4-stable.tar.xz && \
    tar -xf flutter_linux_3.24.4-stable.tar.xz -C /home/flutter/flutter/ && \
    rm flutter_linux_3.24.4-stable.tar.xz

# Set Flutter path
ENV PATH="/home/flutter/flutter/flutter/bin:${PATH}"

# Switch to flutter user
USER flutter

# Configure Git for flutter user
RUN git config --global --add safe.directory /home/flutter/flutter/flutter

WORKDIR /app

# Copy the Flutter project files
COPY --chown=flutter:flutter . .

# Enable web support and get dependencies
RUN flutter config --enable-web && \
    flutter pub get

# Build for web
RUN flutter build web --release

# Serve stage
FROM nginx:alpine

# Copy the built files to nginx
COPY --from=builder /app/build/web /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
