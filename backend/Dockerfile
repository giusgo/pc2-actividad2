# Use the official Node.js image as the base image
FROM node:bookworm

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose ports 8000 and 9000
EXPOSE 4000

# Command to run the Node.js program
CMD ["npm", "run", "dev"]
