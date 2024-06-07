FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Ensure any previously built node_modules are not overwritten
RUN npm rebuild

EXPOSE 8080

CMD ["npm", "run", "start"]
