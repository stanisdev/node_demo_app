const app = require(process.env.APP_PATH);

/**
 * Unhandled Promise rejection handler
 */
process.on('unhandledRejection', (err) => {
  console.log('Unhandled promise rejection');
  console.log(err);
});

/**
 * Not existing route
 */
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Path not found'
  });
});

/**
 * Inner app errors
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: 'Unexpected server error!'
  });
});
