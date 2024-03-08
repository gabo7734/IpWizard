FROM node:20-alpine 
WORKDIR /FIREWALL-
COPY public/ /FIREWALL-/public
COPY src/ /FIREWALL-/src
COPY package.json /FIREWALL-/
RUN npm build
RUN npm install -g serve
RUN npx serve -s build 
CMD [ "npm", "start" ]