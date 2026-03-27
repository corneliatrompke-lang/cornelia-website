FROM node:20-alpine

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies (ignore engine checks for compatibility)
RUN yarn install --ignore-engines

# Set build-time environment variable for React
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Build the app
RUN yarn build

# Install serve to run the static files
RUN yarn global add serve

# Railway sets PORT automatically, default to 8080
ENV PORT=8080
EXPOSE 8080

# Serve the build folder on the PORT Railway provides
CMD serve -s build -l $PORT
