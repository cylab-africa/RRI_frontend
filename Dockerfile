FROM node:18-alpine3.15

WORKDIR /usr/src/app


# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

# Expose 3000
EXPOSE 3000

# Define production env (Will be changed in the future)
ENV REACT_APP_BASE_URL_LOCAL=https://rri-backend.mosipcmuafrica.me/api

RUN npm install -g serve


RUN npm run build


CMD ["serve", "-s", "build"]