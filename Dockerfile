# Stage 1: Build Stage
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the remaining application files
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Production Stage
FROM nginx:alpine

# Set the working directory to Nginx's web root
WORKDIR /usr/share/nginx/html

# Copy only the build artifacts from the build stage
COPY --from=build /app/build/ .

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
