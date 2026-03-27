FROM node:20-alpine

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies (ignore engine checks for compatibility)
RUN yarn install --ignore-engines

# Build the app
RUN yarn build

# Install serve to run the static files
RUN yarn global add serve

# Expose port
EXPOSE 3000

# Serve the build folder
CMD ["serve", "-s", "build", "-l", "3000"]
