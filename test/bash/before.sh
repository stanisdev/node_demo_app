#!/bin/bash
cd db/
NODE_ENV=test ./../node_modules/.bin/sequelize db:create
NODE_ENV=test ./../node_modules/.bin/sequelize db:migrate
NODE_ENV=test ./../node_modules/.bin/sequelize db:seed:all
