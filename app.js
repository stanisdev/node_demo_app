const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const glob = require('glob');

process.env.ROOT_DIR = __dirname;
process.env.APP_PATH = path.join(__dirname, '/app.js');

app.use(logger('dev'));

module.exports = app;

const routes = glob.sync(path.join(__dirname, '/routes/*.js'));
routes.forEach((route) => {
  require(route);
});
