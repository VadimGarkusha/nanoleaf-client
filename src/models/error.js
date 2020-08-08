/**
 * @property {number} status Http error status code
 * @property {text} message Http error description
 */
class HttpError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}
  
export default HttpError;