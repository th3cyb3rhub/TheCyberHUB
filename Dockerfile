# Use an official Node.js base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the entire project to the container
COPY . .

# Build the application for production
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "dev"]