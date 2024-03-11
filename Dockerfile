FROM node:20-alpine 
WORKDIR /FIREWALL-
COPY public/ /FIREWALL-/public
COPY src/ /FIREWALL-/src
COPY package.json /FIREWALL-/
RUN npm install 
RUN npm update
RUN npm run build
CMD [ "npm", "start" ]