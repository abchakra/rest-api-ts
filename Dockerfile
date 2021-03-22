#  Dockerfile for Node Express Backend

FROM node:14-slim

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json /usr/src/app/

RUN npm install --silent

# Copy app source code
COPY . /usr/src/app

# Exports
EXPOSE 3000
EXPOSE 5858
CMD []
CMD [ "npm", "run", "test-dev" ]
# CMD ["node","./dist/app.js"]