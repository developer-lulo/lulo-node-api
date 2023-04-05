#!/bin/sh

cp -v "package.json" ./dist/

# creating zip file to upload to elastic beanstalk
cd ./dist/
zip -r ./dist.zip ./*