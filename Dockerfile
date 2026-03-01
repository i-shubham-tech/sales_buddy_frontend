# Use Node image
FROM node:22

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# React dev server port
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
