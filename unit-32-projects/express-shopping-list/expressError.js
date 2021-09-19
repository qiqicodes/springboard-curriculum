class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.status = status;
    this.message = message;
    console.log(this.stack);
  }
}

module.exports = ExpressError;
