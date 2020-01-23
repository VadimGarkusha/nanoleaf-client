/**
 * @property {number} status Http error status code
 * @property {number} message Http error description
 */
class HttpError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}
  
export default HttpError;