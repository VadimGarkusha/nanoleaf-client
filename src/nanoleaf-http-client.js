import request from 'request';
import c from '../const.js';

class NanoleafHttpClient {
  /**
   *
   * @param {string} host Device local IP
   * @param {string} token Authorization token
   */
  constructor(host, token) {
    this._token = token;
    this._host = new URL(
      `http://${host}:${c.NANOLEAF_PORT}/api/v1/${this._token}/`
    );
  }

  //private methods start with underscore

  /**
   * Authorize requests
   *
   * @param {string} token Authorization token
   */
  authorize(token) {
    if (token) {
      this._token = token;
    }
  }

  /**
   * Send get request
   *
   * @param {string} url
   * @returns {void}
   */
  getRequest(url) {
    console.log(`Path: ${this._host}`);
    console.log(`Url: ${url}`);

    request.get(this._host + url, (error, response, body) => {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  }

  /**
   * Send put request
   *
   * @param {string} url Resource path
   * @param {*} data Body
   * @returns {void}
   */
  putRequest(url, data) {
    console.log(`Path: ${this._host}${url}`);
    console.log(`Body: ${data}`);

    request.put(this._host + url, { body: data }, (error, response, body) => {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  }
}

export default NanoleafHttpClient;
