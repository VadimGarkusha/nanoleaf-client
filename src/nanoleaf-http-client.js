import axios from 'axios';
import c from '../const.js';

/**
 * Class for making http calls to Nanoleaf Device
 */
class NanoleafHttpClient {
  /**
   * @param {string} host Device local IP
   * @param {string} token Authorization token
   */
  constructor(host, token) {
    this._token = token;
    this._host = new URL(
      `http://${host}:${c.NANOLEAF_PORT}/api/v1/${
        this._token ? this._token + '/' : ''
      }`
    );
  }

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
   * @returns {Promise<any>}
   */
  async getRequest(url = '') {
    return await axios
      .get(this._host + url)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return this._handleErrorResponse(error.response.status);
      });
  }

  /**
   * Send put request
   *
   * @param {string} url Resource path
   * @param {any} body Body
   * @returns {Promise<any>}
   */
  async putRequest(url, body) {
    return await axios
      .put(this._host + url, body)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return this._handleErrorResponse(error.response.status);
      });
  }

  /**
   * Send post request
   *
   * @param {string} url Resource path
   * @param {any} body Body
   * @returns {Promise<any>}
   */
  async postRequest(url) {
    return await axios
      .post(this._host + url)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return this._handleErrorResponse(error.response.status);
      });
  }

  /**
   * Handle error responses
   * 
   * @param {number} errorCode http error code
   */
  _handleErrorResponse(statusCode) {
    let message;
    switch(statusCode) {
      case 400:
        message = 'Bad request'
        break;
      case 401:
        message = 'Request was not authorized';
        break;
      case 403:
        message = 'Request is forbidden';
        break;
      case 404:
        message = 'Resource not found'
        break;
      case 422:
        message = 'Unprocessable entity';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }

    return { statusCode, message };
  }

}

export default NanoleafHttpClient;