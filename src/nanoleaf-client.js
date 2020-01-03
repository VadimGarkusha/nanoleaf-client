import NanoleafHttpClient from './nanoleaf-http-client.js';

class NanoleafClient {
  /**
   *
   * @param {string} host Device local IP
   * @param {string} token Authorization token
   */
  constructor(host, token = '') {
    this._client = new NanoleafHttpClient(host, token);
  }

  /**
   *
   */
  async getPowerStatus() {
    return await this._client.getRequest('state/on');
  }

  /**
   *
   */
  async getInfo() {
    return await this._client.getRequest();
  }

  /**
   *
   */
  async turnOn() {
    return await this._client.putRequest('state', { on: { value: true } });
  }
}

export default NanoleafClient;
