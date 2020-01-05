import axios from 'axios';
import PowerStatus from './models/power-status.js';
import NanoleafHttpClient from './nanoleaf-http-client.js';

class NanoleafClient {
  /**
   * @param {string} host Device local IP
   * @param {string} [token=''] Authorization token
   */
  constructor(host, token = '') {
    this._client = new NanoleafHttpClient(host, token);
  }

  /**
   * Gets power status of the device (on/off)
   *
   * @returns {Promise<PowerStatus>}
   */
  async getPowerStatus() {
    const response = await this._client.getRequest('state/on');
    return new PowerStatus(response);
  }

  /**
   *
   */
  async getInfo() {
    return await this._client.getRequest();
  }

  /**
   *  Turns the device on
   */
  async turnOn() {
    return await this._client.putRequest('state', { on: { value: true } });
  }

  /**
   *
   *
   */
  async authorizeUser() {
    const response = await this._client.postRequest('new/');
    console.log(response.auth_token + 'token');
    this._client._token = response.auth_token;
    console.log(this._client, this._client._token);
  }
}

export default NanoleafClient;
