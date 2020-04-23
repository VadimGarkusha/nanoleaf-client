/**
 * @property {number} status Http status code
 * @property {string} message Http status text
 * @property {object} data Response data
 */
class HttpResponse {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default HttpResponse;
