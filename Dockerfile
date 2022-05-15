FROM node

LABEL maintainer="Stone Bird 1245863260@qq.com"

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN chmod -R 777 /usr/src/app && npm install



EXPOSE 3000

CMD [ "npm", "start" ]
