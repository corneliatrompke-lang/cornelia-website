FROM node:20-alpine AS builder

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies (ignore engine checks for compatibility)
RUN yarn install --ignore-engines

# Build the app (REACT_APP_BACKEND_URL is intentionally NOT set here;
# it is injected at runtime via start.sh so the same image works in any environment)
RUN yarn build

# Production stage - use lightweight node with serve
FROM node:20-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/build ./build

# Copy the runtime startup script and make it executable
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Expose port 8080 for Railway
EXPOSE 8080

# start.sh writes config.js from REACT_APP_BACKEND_URL, then runs serve
CMD ["./start.sh"]
