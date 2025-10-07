# ---------- Frontend Dockerfile (build + Nginx serve + startup message) ----------

# ---- Build stage ----
FROM node:20.19.0 AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:stable-alpine

# Copy built React app
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (to silence logs)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy startup message script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
