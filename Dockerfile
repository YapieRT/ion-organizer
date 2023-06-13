# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the entire project
COPY . .

# Install dependencies
RUN npm install

# Set environment variable for the backend IP address
ENV REACT_APP_BACKEND_IP=

# Serve the built project with a static server

CMD ["sh", "serve-script.sh"]
# Expose the desired port (e.g., 80)
EXPOSE 80
