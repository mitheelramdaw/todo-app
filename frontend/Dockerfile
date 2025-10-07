# ----------- Frontend Dockerfile (Stable + Rollup Fix) -----------
# Use Node 20 (required by Vite 6+)
FROM node:20.19.0

# Set working directory inside the container
WORKDIR /app

# Copy package manifests first (for better Docker caching)
COPY package*.json ./

# Clean npm cache and force fresh install
RUN npm cache clean --force
RUN npm install --force

# Explicitly reinstall correct Rollup binary for Linux
RUN npm install rollup@latest --force

# Copy the rest of the frontend code
COPY . .

# Build the production-ready bundle (optional but safe)
RUN npm run build

# Expose Vite development server port
EXPOSE 5173

# Run the Vite development server and allow external connections
CMD ["npm", "run", "dev", "--", "--host"]
