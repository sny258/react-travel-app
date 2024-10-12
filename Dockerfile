# Stage 1: Build React app
FROM node:22-alpine AS build
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# Copy the rest of the app source code
COPY . .
# Build the React app (uses .env files based on environment)
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine
# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html
# Copy custom Nginx configuration to forward API calls to backend
COPY nginx.conf /etc/nginx/nginx.conf
# Expose port 80 for the web server
EXPOSE 80
# Run Nginx
CMD ["nginx", "-g", "daemon off;"]




#docker build -t react-app-frontend .
#docker run -d -p 8080:80 react-app-frontend
