module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'node_demo_app',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: true
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'node_demo_app_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    logging: true
  }
};
