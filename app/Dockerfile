# build app folder
FROM node:18

WORKDIR /usr/app/src

# copy the package*.json
COPY package*.json ./

RUN npm install 

# copy files and build app then run
COPY . .

EXPOSE 8080

CMD ["npm", "start"]