# Taking ubuntu as base image for the final image
FROM escoacrprod01.azurecr.io/ubuntu/nodejs:10.x 

RUN groupadd -g 999 irwo-grp && useradd -r -u 999 -g root irwo

# Creating app and change directory to /app

RUN mkdir /app && mkdir /appl
WORKDIR /app

COPY .npmrc /app/

# Install app dependencies
COPY package*.json /app/


# Granting th eowner and group to app dir
RUN chown irwo:irwo-grp /app -R && chown irwo:irwo-grp /appl -R

RUN chown irwo:irwo-grp /home/ -R

RUN chgrp -R 0 /app && chmod -R g+rwX /app


RUN rm -rf server


COPY . /app/


# Port to listener
EXPOSE 3000

#MSAL-UI
EXPOSE 7000
USER irwo
#Starting the application
CMD [ "/bin/sh", "npmscripts.sh" ]