FROM node:latest as frontend
WORKDIR /ppc-client
COPY ./ppc-client/public ./public
COPY ./ppc-client/src ./src
COPY ./ppc-client/package-lock.json ./
COPY ./ppc-client/package.json ./
COPY ./ppc-client/tsconfig.json ./

WORKDIR /ppc-client
RUN npm install 
RUN npm run build --production
RUN ls -l

# Run server
FROM  node:latest as backend
RUN npm install pm2 -g
RUN npm install ts-node -g
RUN pm2 install typescript

WORKDIR /ppc-server
COPY ./ppc-server/app ./app
COPY ./ppc-server/bin ./bin
COPY ./ppc-server/db ./db
COPY ./ppc-server/app.ts .
COPY ./ppc-server/package-lock.json .
COPY ./ppc-server/package.json .
COPY ./ppc-server/tsconfig.json .
COPY ./ppc-server/ecosystem.config.js .
COPY  --from=frontend /ppc-client/build ./public
RUN ls -R
RUN npm install
RUN ts-node db/initDB.ts
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env" ,"production"]
