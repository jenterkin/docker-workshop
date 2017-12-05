FROM kkarczmarczyk/node-yarn:8.0

ENV SRC=/src
COPY . $SRC
WORKDIR $SRC
RUN yarn install
CMD yarn start
