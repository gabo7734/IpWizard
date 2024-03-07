FROM node:20-alpine 
WORKDIR /FIREWALL-
COPY public/ /FIREWALL-/public
COPY src/ /FIREWALL-/src
COPY package.json /FIREWALL-/
RUN npm install
CMD [ "npm", "start" ]