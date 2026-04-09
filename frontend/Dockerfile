FROM node:20-alpine AS builder

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies (ignore engine checks for compatibility)
RUN yarn install --ignore-engines

# Set build-time environment variable for React (hardcoded for Railway production)
ENV REACT_APP_BACKEND_URL=https://cornelia-website-backend-production.up.railway.app

# Build the app
RUN yarn build

# Production stage - use lightweight node with serve
FROM node:20-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/build ./build

# Expose port 8080 for Railway
EXPOSE 8080

# Serve the build folder on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]
