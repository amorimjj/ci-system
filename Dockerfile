FROM node:6

RUN \
  apt-get update \
  && apt-get install -y ruby-full \
  && gem install --no-rdoc --no-ri sass -v 3.4.22 \
  && gem install --no-rdoc --no-ri compass \
  && gem install --no-rdoc --no-ri bootstrap-sass \
  && npm install -g gulp \
  && npm install phantomjs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
