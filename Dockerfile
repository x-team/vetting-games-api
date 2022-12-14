FROM node:18

WORKDIR /usr/src/app

#Download aws-env
RUN wget https://github.com/Droplr/aws-env/raw/master/bin/aws-env-linux-amd64 -O /bin/aws-env && chmod +x /bin/aws-env

COPY package.json ./
RUN yarn install

COPY . .

RUN yarn db:generate
RUN yarn build

CMD eval $(aws-env) && yarn start