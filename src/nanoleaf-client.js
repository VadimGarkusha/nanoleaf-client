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

  /**
   * @returns {string}
   */
  async addUserRequest() {
    console.log(`Path: ${this._host}new/`);

    return await axios
      .post(`${this._host}new/`)
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

export default NanoleafClient;
