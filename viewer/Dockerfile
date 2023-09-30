FROM ubuntu:latest

WORKDIR /app

COPY package*.json ./

RUN apt-get update && \
    apt-get install -y nodejs npm && \
    npm install

COPY . .

EXPOSE 5000/tcp

CMD ["node", "app.js", "&"]
