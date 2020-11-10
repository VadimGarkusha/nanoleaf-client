import axios from 'axios';
import c from './const.js';
import { HttpError, HttpResponse } from './models/index.js';

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
   * @returns {Promise<object>|Promise<HttpError>}
   */
  getRequest(url = '') {
    return axios
      .get(this._host + url, { cancelToken: this._getCancellationToken() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw this._handleErrorResponse(error);
      });
  }

  /**
   * Send put request
   *
   * @param {string} url Resource path
   * @param {any} body Body
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  putRequest(url, body) {
    return axios
      .put(this._host + url, body, { cancelToken: this._getCancellationToken() })
      .then(response => {
        return this._handleSuccessResponse(response);
      })
      .catch(error => {
        throw this._handleErrorResponse(error);
      });
  }

  /**
   * Send post request
   *
   * @param {string} url Resource path
   * @param {any} body Body
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  postRequest(url) {
    return axios
      .post(this._host + url, {}, { cancelToken: this._getCancellationToken() })
      .then(response => {
        return this._handleSuccessResponse(response);
      })
      .catch(error => {
        throw this._handleErrorResponse(error);
      });
  }

  /**
   * Handle error responses
   *
   * @param {number} errorCode http error code
   * @returns {HttpError}
   */
  _handleErrorResponse(error) {
    let message,
      statusCode = 0;

    if (error.response) {
      statusCode = error.response.status;
    }

    switch (statusCode) {
    case 400:
      message = 'Bad request';
      break;
    case 401:
      message = 'Request was not authorized';
      break;
    case 403:
      message = 'Request is forbidden';
      break;
    case 404:
      message = 'Resource not found';
      break;
    case 422:
      message = 'Unprocessable entity';
      break;
    case 500:
      message = 'Internal server error';
      break;
    default:
      message = 'The device is offline';
    }

    return new HttpError(statusCode, message);
  }

  /**
   * Handle success responses
   *
   * @param {any} response
   * @returns {HttpResponse}
   */
  _handleSuccessResponse(response) {
    return new HttpResponse(
      response.status,
      response.statusText,
      response.data
    );
  }

  /**
   * Creates cancellation token with timeout
   * 
   */
  _getCancellationToken() {
    let source = axios.CancelToken.source();
    setTimeout(() => {
      source.cancel();
    }, c.CONNECTION_TIMEOUT_SECONDS * 1000);

    return source.token;
  }
}

export default NanoleafHttpClient;
