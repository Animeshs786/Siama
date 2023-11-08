class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {string} message - A human-readable error message describing the issue.
   * @param {number} statusCode - An HTTP status code to indicate the error's severity.
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const finalErrorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode);
  if (statusCode === 500) {
    console.log(error);
    return res.json({ status: false, message: error.message, stack: error.stack, error: error });
  }
  res.json({ status: false, message: error.message });
};

module.exports = {
  ApiError,
  finalErrorHandler,
};
