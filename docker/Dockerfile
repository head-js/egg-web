FROM node:8.9.1-slim

EXPOSE 7001

RUN \
  mkdir -p /var/app && \
  mkdir -p /var/app-build && \
  mkdir -p /var/app-run

RUN \
  buildDeps='git make g++' && \
  apt-get update && apt-get install -y $buildDeps

COPY package-build.json /var/app-build/package.json
RUN cd /var/app-build && npm install --no-package-lock

COPY package-run.json /var/app-run/package.json
RUN cd /var/app-run && npm install --no-package-lock

RUN \
  buildDeps='git make g++' && \
  npm cache clean --force && \
  apt-get purge -y --auto-remove $buildDeps && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /var/app

ENV NODE_ENV production


CMD ["/usr/local/bin/node", "/var/app/index.js"]
