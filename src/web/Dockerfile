FROM ubuntu:latest

ENV TERM eterm-color

RUN apt-get update -y && apt-get install -y software-properties-common \
    python-software-properties && apt-get update -y && \
    add-apt-repository -y ppa:ethereum/ethereum && apt-get update -y && \
    apt-get install -y ethereum git curl sudo

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
    apt-get install -y nodejs build-essential

WORKDIR /code
   
RUN npm install -g truffle truffle-expect truffle-config web3

WORKDIR /code/web

ADD package.json /code/web/package.json
RUN npm install

ADD command.sh /code/web/command.sh
