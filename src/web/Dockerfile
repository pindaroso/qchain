FROM ubuntu:latest
RUN apt-get update -y && apt-get install -y software-properties-common \
    python-software-properties && apt-get update -y && \
    add-apt-repository -y ppa:ethereum/ethereum && apt-get update -y && \
    apt-get install -y ethereum git curl sudo
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
    apt-get install -y nodejs build-essential
WORKDIR /code
ADD package.json /code/package.json
RUN npm install
