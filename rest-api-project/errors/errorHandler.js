const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      name: err.name,
      message: err.message || 'Something went wrong',
    },
  });
};

module.exports = errorHandler;
