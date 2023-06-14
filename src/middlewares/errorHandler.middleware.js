const ApiError = require("../utils/apiError");

module.exports = (err, req, res, next) => {
  let error;
  let message;

  error = { ...err };

  error.statusCode = err.statusCode || 500;
  error.status = err.status || "error";
  message = err.message || "Something went wrong";
  error.name = err.name; //Bazen {...err} error.name'yi atamiyor
  error.stack = err.stack;

  switch (error.name) {
    case "ValidationError":
      message = `Invalid input data: ${err.message} (${err.path}: ${err.value})`;
      console.log(err);
      error = new ApiError(message, 400);
      break;
    case "CastError":
      message = `Invalid format. ${err.path}: ${err.value} is not a valid format.`;
      error = new ApiError(message, 400);
      break;
    case "JsonWebTokenError":
      message = "Invalid token.";
      error = new ApiError(message, 401);
      break;
    case "TokenExpiredError":
      message = "Token expired.";
      error = new ApiError(message, 401);
      break;
  }

  if (process.env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      status: error.status,
      message: message,
      error,
      stack: error.stack,
    });
  } else {
    if (!error.isOperational) {
      console.log("Internal Error", error);
      message = "Something went wrong.";
    }
    res.status(error.statusCode).json({
      status: error.status,
      message: message,
    });
  }
};
