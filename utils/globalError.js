class globalError extends Error {
  statusCode;
  statusText;
  constructor(message, code, text) {
    super(message);
    this.statusCode = code;
    this.statusText = text;
  }
}

export { globalError };
