FROM node:8.11.4

RUN npm i -g @adonisjs/cli

WORKDIR /usr/src/app

ENV HOST=0.0.0.0
ENV PORT=80

COPY ./startup.sh /opt/startup.sh
CMD ["/bin/bash", "/opt/startup.sh"]

EXPOSE 80
