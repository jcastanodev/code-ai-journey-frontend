# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000

# start app
CMD [ "npm", "run", "dev" ]
