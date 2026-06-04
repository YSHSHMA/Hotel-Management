# Use official Node.js image
FROM node:22-alpine

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and shared types explicitly
COPY src ./src
COPY shared ./shared
COPY tsconfig.json ./
COPY package.json ./
COPY package-lock.json ./

# Expose application port
EXPOSE 3000



# Start application
CMD ["npm", "run", "dev"]
