FROM node:18-alpine3.15
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install app dependencies
RUN npm install
COPY . .
# Expose 3000
EXPOSE 3000

ARG REACT_APP_CLIENT_ID
ENV REACT_APP_CLIENT_ID=$REACT_APP_CLIENT_ID

# ENV Definition 
ENV GENERATE_SOURCEMAP=false
# Define test/staging env (Will be changed in the future)
ENV REACT_APP_BASE_URL_LOCAL=https://rri-backend.mosipcmuafrica.me/api
# Define production env (Will be changed in the future)
ENV REACT_APP_BASE_URL_PRODUCTION=https://rri-backend.mosipcmuafrica.me/api
# Install production server
RUN npm install -g serve
# Build the project
RUN npm run build
# Run the production server
CMD ["serve", "-s", "build"]