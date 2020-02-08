#############
### Build ###
#############

# base image
FROM node:12.7-alpine AS build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /app

# generate build
RUN npm run build

############
### Run ###
############

FROM nginx:1.17.1-alpine
COPY --from=build /app/dist /usr/share/nginx/html
