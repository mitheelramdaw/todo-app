# ---------- Frontend Dockerfile (build + Nginx serve) ----------
# ---- Build stage ----
FROM node:20.19.0 AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build     # creates /app/dist

# ---- Serve stage ----
FROM nginx:stable-alpine

# Copy build output to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Default Nginx start command
CMD ["nginx", "-g", "daemon off;"]
