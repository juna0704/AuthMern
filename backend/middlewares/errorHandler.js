const errorHandler = (err, req, res, next) => {
  const resCode = res.statusCode ? res.statusCode : 500;

  res.status(resCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
