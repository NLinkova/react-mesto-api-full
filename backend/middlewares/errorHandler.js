const errorHandler = (err, req, res, next) => {
  const {
    statusCode = 500,
    message = 'Произошла ошибка на сервере',
  } = err;

  res
    .status(statusCode)
    .send({
      message: `${statusCode} ${message}`,
    });

  return next();
};

module.exports = errorHandler;
