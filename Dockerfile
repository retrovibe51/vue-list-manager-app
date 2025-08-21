# Stage 1: Build the application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy only the necessary files for dependency installation
COPY package.json yarn.lock ./
RUN yarn install

# Copy project files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start dev server (default host 0.0.0.0 to allow external access)
CMD ["yarn", "dev", "--host"]