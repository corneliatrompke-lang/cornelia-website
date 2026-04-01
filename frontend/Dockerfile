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

# Production stage with nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 8080 for Railway
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
