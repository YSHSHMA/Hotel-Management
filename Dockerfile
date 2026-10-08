FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

RUN cd backend && npm install --fetch-retries=5 --fetch-retry-factor=2 --fetch-retry-mintimeout=10000 --fetch-retry-maxtimeout=120000

RUN cd frontend && npm install --fetch-retries=5 --fetch-retry-factor=2 --fetch-retry-mintimeout=10000 --fetch-retry-maxtimeout=120000

COPY backend ./backend
COPY frontend ./frontend

EXPOSE 3000
EXPOSE 5174

# CMD ["sh", "-c", "cd backend && npm run dev"]
CMD ["sh", "-c", "cd backend && NODE_OPTIONS=--max-old-space-size=384 npm run dev"]