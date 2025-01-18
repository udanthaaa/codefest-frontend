# Stage 1: Build the React app  
FROM node:16-alpine AS build  
  
# Set working directory  
WORKDIR /app  
  
# Copy package.json and package-lock.json  
COPY package*.json ./  
  
# Install dependencies  
RUN npm install  
  
# Copy the rest of the application files  
COPY . .  
  
# Build the React app  
RUN npm run build  
  
# Stage 2: Serve the React app  
FROM nginx:alpine  
  
# Copy the built app from the previous stage  
COPY --from=build /app/dist /usr/share/nginx/html  
  
# Copy custom nginx configuration if needed  
# COPY nginx.conf /etc/nginx/nginx.conf  
  
# Expose port 80  
EXPOSE 80  
  
# Start Nginx server  
CMD ["nginx", "-g", "daemon off;"]  