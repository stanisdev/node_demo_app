#!/bin/bash
cd db/
NODE_ENV=test ./../node_modules/.bin/sequelize db:drop
