FROM node:12

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

COPY . .

ENV PORT 8080

EXPOSE 8080
ENTRYPOINT ["npm start"]
