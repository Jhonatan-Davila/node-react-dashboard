FROM mhart/alpine-node:10

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package.json /app/server
COPY package-lock.json /app/server

RUN node -v
RUN npm install

COPY . /app/server

CMD ["npm", "run", "start:express"]