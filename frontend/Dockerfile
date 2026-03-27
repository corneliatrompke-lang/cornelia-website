FROM node:20-alpine

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies (ignore engine checks for compatibility)
RUN yarn install --ignore-engines

# Set build-time environment variable for React (hardcoded for Railway production)
ENV REACT_APP_BACKEND_URL=https://cornelia-website-backend-production.up.railway.app

# Build the app
RUN yarn build

# Install serve to run the static files
RUN yarn global add serve

# Railway sets PORT automatically, default to 8080
ENV PORT=8080
EXPOSE 8080

# Serve the build folder on the PORT Railway provides
CMD serve -s build -l $PORT
