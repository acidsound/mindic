#!/bin/bash

# IP or URL of the server you want to deploy to
APP_HOST=[YOUR_DOMAIN]
# Uncomment this if your host is an EC2 instance
# EC2_PEM_FILE=path/to/your/file.pem

APP_NAME=mindic
HOST_USER=[YOUR_ID]
LOGFILE=/home/$HOST_USER/deploy.log
ROOT_URL=http://$APP_HOST
PORT=3000
SSH_OPT=
APP_DIR=/home/$HOST_USER/workspace
MONGO_URL=mongodb://[ID]:[PASS]@localhost:27017/$APP_NAME
METEOR_CMD=mrt
if [ -z "$EC2_PEM_FILE" ]; then
    SSH_HOST="$HOST_USER@$APP_HOST" SSH_OPT=""
  else
    SSH_HOST="ubuntu@$APP_HOST" SSH_OPT="-i $EC2_PEM_FILE"
fi

echo Deploying...
echo $METEOR_CMD makes bundle file...
$METEOR_CMD bundle bundle.tgz > /dev/null 2>&1 &&
echo Bundle file created.....
scp $SSH_OPT bundle.tgz $SSH_HOST:$APP_DIR > /dev/null 2>&1 &&
echo Bundle file transferred to target...
rm bundle.tgz > /dev/null 2>&1 &&
echo Process remote tasks...
ssh $SSH_OPT $SSH_HOST APP_NAME=$APP_NAME PORT=$PORT MONGO_URL=$MONGO_URL ROOT_URL=$ROOT_URL APP_DIR=$APP_DIR LOGFILE=$LOGFILE 'bash -s' > /dev/null 2>&1 <<'ENDSSH'
date +%F/%k:%M:%S >> $LOGFILE
if [ ! -d "$APP_DIR/$APP_NAME" ]; then
echo >> $LOGFILE
mkdir -p $APP_DIR
fi
pushd $APP_DIR
forever stop $APP_NAME/main.js >> $LOGFILE
rm -rf bundle mindic
tar xfz bundle.tgz -C $APP_DIR >> $LOGFILE
rm bundle.tgz
rm -rf bundle/programs/server/node_modules/fibers
pushd $APP_DIR/bundle
npm install fibers@1.0.1
popd >> $LOGFILE
mv bundle $APP_NAME
forever start $APP_NAME/main.js >> $LOGFILE
popd >> $LOGFILE
echo >> $LOGFILE
ENDSSH
echo Your app is deployed and serving on: $ROOT_URL
