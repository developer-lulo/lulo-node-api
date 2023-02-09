#!/bin/sh

touch dist/package.json
# The purpose of this file is so that the underlying library that powers Sequelize migrations,
# uzmug, can use `require`
echo '{
  "name": "@lulo/sequelize-out",
  "type": "commonjs"
}' >dist/package.json
