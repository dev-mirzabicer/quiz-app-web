# Build frontend
FROM node:14 AS frontend-builder

WORKDIR /app/frontend

COPY client/package*.json ./

RUN npm install

COPY client/ .

RUN npm run build

# Build backend
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Copy frontend build output to backend
COPY --from=frontend-builder /app/frontend/dist /app/client/dist

EXPOSE 3000

CMD ["npm", "start"]