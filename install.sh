#!/bin/bash
npm i
cd db/
./../node_modules/.bin/sequelize db:create
./../node_modules/.bin/sequelize db:migrate
echo "Please, run app with command 'npm start'"
