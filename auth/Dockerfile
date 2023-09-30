FROM ubuntu:latest

WORKDIR /app

COPY package*.json .

RUN apt-get update && \
    apt-get install -y curl && \
    apt-get install -y nodejs npm && \
    npm install

COPY login.html .
COPY signup.html .
COPY app.js .

EXPOSE 3000

CMD ["node", "app.js", "&"]
