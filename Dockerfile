FROM node:14

WORKDIR /usr/src/app

# Install app dependencies
RUN apt-get update

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 13337

CMD [ "node", "index.js" ]