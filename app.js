const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const glob = require('glob');
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

app.use(methodOverride((req) => {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		const method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

process.env.ROOT_DIR = __dirname;
process.env.APP_PATH = path.join(__dirname, '/app.js');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;

/**
 * Routes
 */
const routes = glob.sync(path.join(__dirname, '/routes/*.js'));
routes.forEach((route) => {
  require(route);
});

/**
 * Services
 */
const services = glob.sync(path.join(__dirname, '/services/*.js'));
services.forEach((service) => {
  require(service);
});
