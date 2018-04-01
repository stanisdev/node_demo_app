const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.js')[env];
const db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.assembleErrors = function(errors) {
  const messages = {}
  if (Array.isArray(errors)) {
    errors.forEach((field) => {
      let path = field.path;
      if (Array.isArray(messages[path])) {
        return messages[path].push(field.message);
      }
      messages[field.path] = [field.message];
    });
  }
  return messages;
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
