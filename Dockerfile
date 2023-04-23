FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY server/package.json /app/server
WORKDIR /app/server
RUN npm install
WORKDIR /app
COPY . .
EXPOSE 3001
CMD ["yarn", "dev"]
