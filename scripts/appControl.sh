#!/bin/bash
home=/Users/germoroney/Development/swf
scripts=${home}/scripts
src=${home}/src
logs=${home}/logs
cd ${src}
datestamp=`date +%Y%m%d%H%M%S`
nohup nodemon server.js > ${logs}/server.${datestamp}.log 2>&1 &
exit 0
