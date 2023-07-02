# Use the latest LTS (long-term support) version of Node.js as the base image
FROM node:lts-alpine

# Set the working directory to the project root
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json /app

# Install the dependencies
RUN npm install

# Copy the remaining files to the working directory
COPY . /app

# Expose the app's port
EXPOSE 3000

# Run the app when the container is started
CMD [ "npm", "run", "dev" ]
