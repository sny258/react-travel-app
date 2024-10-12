# Stage 1: Build the application
FROM node:22-slim AS builder
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .

# Stage 2: Run the application
FROM node:22-slim
# Set the working directory
WORKDIR /app
# Copy the node_modules and build output from the builder stage
COPY --from=builder /app .
# Expose the port the app runs on
EXPOSE 5000
# Start the application
CMD ["node", "server.js"]



#docker build -t react-app-backend .
#docker run -p 5000:5000 react-app-backend