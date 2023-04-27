# Use an official Node.js base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the application for production
RUN npm run build

# Install http-server package
RUN npm install -g http-server

# Expose the port that the application will run on
EXPOSE 8080

# Start the application using http-server
CMD ["http-server", "dist"]