FROM ubuntu

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    npm install

# Copy application files
COPY . .

# Copy the login.html file to the public directory
COPY login.html /app/public/

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "app.js", "&"]
