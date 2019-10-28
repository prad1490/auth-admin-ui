FROM mhart/alpine-node:9.9.0

MAINTAINER [m]PLATFORM

WORKDIR /app
ADD . .

# RUN yarn install

EXPOSE 5000

CMD ["yarn", "start"]