FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm rebuild
EXPOSE 8080
CMD ["npm", "run", "dev:docker"]
