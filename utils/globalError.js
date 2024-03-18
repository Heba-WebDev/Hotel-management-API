class AppError extends Error {
  constructor(message, code, text) {
    super(message);
    this.statusCode = code;
    this.statusText = text;
  }
}

const globalError = new AppError();

export default globalError;
