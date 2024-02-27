FROM node:alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]

# command to run for use this after built . do not forget to make it run proper command for pro mode
# docker run -d -p 80:3000 -v /home/M_10_a/server:/usr/src/app -v /usr/src/app/node_modules --name my-m10a-node-container my-m10a-node
