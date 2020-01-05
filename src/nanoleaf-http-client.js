import axios from 'axios';
import c from '../const.js';

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
   * @returns {Promise<any>}
   */
  async getRequest(url = '') {
    console.log(`Path: ${this._host}`);
    console.log(`Url: ${url}`);

    return await axios
      .get(this._host + url)
      .then(response => {
        console.log('statusCode:', response && response.status);
        console.log('data:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('error:', error);
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
    console.log(`Path: ${this._host}${url}`);
    console.log(`Request Body: ${body}`);

    return await axios
      .put(this._host + url, body)
      .then(response => {
        console.log('statusCode:', response && response.status);
        console.log('data:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('error:', error);
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
    console.log(`Path: ${this._host}${url}`);
    console.log(url);

    return await axios
      .post(this._host + url)
      .then(response => {
        console.log('statusCode:', response && response.status);
        console.log('data:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('error:', error);
      });
  }
}

export default NanoleafHttpClient;
