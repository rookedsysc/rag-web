# Environemnt to install flutter and build web
FROM ubuntu:22.04

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y curl git unzip xz-utils zip libglu1-mesa wget gpg apt-transport-https ca-certificates

# Install Google Chrome
#RUN wget -q -O /tmp/google.pub https://dl-ssl.google.com/linux/linux_signing_key.pub \
#    && mkdir -p /etc/apt/keyrings \
#    && gpg --no-default-keyring \
#        --keyring /etc/apt/keyrings/google-chrome.gpg \
#        --import /tmp/google.pub \
#    && echo 'deb [arch=amd64 signed-by=/etc/apt/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main' \
#        | tee /etc/apt/sources.list.d/google-chrome.list \
#    && apt-get update \
#    && apt-get install -y google-chrome-stable \
#    && rm -rf /var/lib/apt/lists/* \
#    && rm -f /tmp/google.pub

# Install and setup Flutter
RUN mkdir -p /usr/local/flutter
RUN wget -q https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.24.4-stable.tar.xz \
RUN tar -xf flutter_linux_3.24.4-stable.tar.xz -C /usr/local/flutter/ \
RUN rm flutter_linux_3.24.4-stable.tar.xz
ENV PATH="/usr/local/flutter/flutter/bin:${PATH}"


WORKDIR /app

# Copy the Flutter project files
COPY . .

# Enable web support and get dependencies
RUN flutter config --enable-web \
    && flutter pub get

# Build for web
RUN flutter build web --release

