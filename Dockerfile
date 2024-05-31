FROM node:18-alpine3.15

WORKDIR /usr/src/app


# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

# Expose 3000
EXPOSE 3000

RUN npm install -g serve


RUN npm run build



CMD ["serve", "-s", "bild"]