// Centralized error handler.
// Instead of writing try/catch error-formatting logic in every controller,
// we throw/pass errors and let this middleware format the response consistently.

// Handles routes that don't exist (404)
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error); // pass the error to errorHandler below
};

// Handles all errors passed via next(error)
export const errorHandler = (err, req, res, next) => {
  // Sometimes an error comes in with status 200 by mistake; default to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose "CastError" happens when an invalid MongoDB ID is used
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    // Only show the full error stack in development, not in production
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
