const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = "Server error" } = err;

  res.status(statusCode).send({
    message: `${statusCode} ${message}`,
  });

  return next();
};

module.exports = errorHandler;
