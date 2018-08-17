FROM ubuntu:16.04

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl apt-utils apt-transport-https
RUN apt-get install -y build-essential libssl-dev

RUN mkdir /usr/local/nvm

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.11.3

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install --no-install-recommends yarn

ENV PATH "$(yarn global bin):$PATH"

WORKDIR /var/www
RUN ls

# log dir
VOLUME /var/log/log

# Bundle app source
COPY . /var/www
RUN mkdir /var/www/cache

RUN touch get_data.sh
RUN echo '=============='
RUN echo 'start download'
RUN echo '=============='
RUN echo "#!/bin/bash
YEAR=2002 \
CURRENT=`date +%Y` \
while [ $YEAR -ne $CURRENT ]; do \
   curl -LO https://nvd.nist.gov/feeds/json/cve/1.0/nvdcve-1.0-'$YEAR'.json.zip
   unzip
   YEAR=$(($YEAR+1)) \
done" > get_data.sh

CMD ["cat", "get_data.sh"]
CMD ["ls"]
# Install app dependencies
#RUN yarn

#EXPOSE  3000
#CMD ["yarn", "dev"]

#RUN yarn dev
