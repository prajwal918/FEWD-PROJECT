FROM node:18-alpine AS backend-builder
WORKDIR /app
COPY src/backend/package*.json ./
RUN npm install
COPY src/backend/ ./

FROM node:18-alpine
WORKDIR /app
COPY --from=backend-builder /app ./
EXPOSE 3000
CMD ["node", "server.js"]