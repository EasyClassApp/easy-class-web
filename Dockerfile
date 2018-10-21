###########################################################################################
# BUILD PHASE
###########################################################################################
FROM node:alpine as builder

# the folder application within the container (prevents conflicts with OS folders)
WORKDIR  /usr/src/app

# install dependencies (copies 'from folder' --> 'destination folder')
COPY package.json /usr/src/app
RUN npm install

# copy application files (moved here to make use of Docker's cache machanism)
COPY . /usr/src/app

# generate the static build with webpack
RUN npm run build


###########################################################################################
# RUN PHASE: COPY TO NGINX (SERVES BY DEFAUT ON PORT 80)
###########################################################################################
FROM nginx:1.15.5

# use custom Nginx configurations
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

# copy build results to Nginx server
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# needed for Heroku
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
