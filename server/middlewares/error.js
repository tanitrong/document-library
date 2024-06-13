const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  //wrong mongodb id
  if (err.name === "CastError") {
    const message = `resource not found with this id.. invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //duplicate key error
  if (err.code === 11000) {
    const message = `duplicate key ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt
  if (err.name === "JsonWebTokenError") {
    const message = `your url is invalid please try again`;
    err = new ErrorHandler(message, 400);
  }

  //jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `your url is expired please try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
