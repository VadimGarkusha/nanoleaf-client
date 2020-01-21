/**
 * @property {number} status Http status code
 * @property {number} message Http status text
 * @property {object} data Response data
 */
class HttpResponse {
    constructor(status, message) {
      this.status = status;
      this.message = message;
    }
}
  
export default HttpResponse;