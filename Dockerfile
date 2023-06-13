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
ENV REACT_APP_IP=
# Build the React project
RUN npm run build

# Serve the built project with a static server
RUN npm install -g serve
CMD ["sh", "-c", "serve -s build -l $REACT_APP_IP"]

# Expose the desired port (e.g., 80)
EXPOSE 80
