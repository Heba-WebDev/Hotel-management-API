class globalError extends Error {
    constructor(message, code, text) {
        super(message);
        this.statusCode = code;
        this.statusText = text;
    }
}
export { globalError };
