module.exports = class WebClientException extends Error {
  constructor(status, code, message) {
    if (!message) {
      message = code;
      code = status;
      status = 422;
    }

    super(message);

    this.name = "WebClientException";
    this.status = status;
    this.code = code;
  }
}
