import axios from 'axios';
import PowerStatus from './models/power-status.js';
import Saturation from './models/saturation.js';
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
   * Get and save token for http-client
   */
  async authorizeUser() {
    // TODO: add save token after request
    const response = await this._client.postRequest('new/');
  }

  /**
   * Get current saturation
   *
   * @returns {Promise<Saturation>}
   */
  async getSaturation() {
    return new Saturation(await this._client.getRequest('state/sat'));
  }

  /**
   * Set saturation
   *
   * @param {Number} saturation
   */
  async setSaturation(saturation) {
    await this._client.putRequest('state', {
      sat: { value: saturation }
    });
  }

  /**
   * Set saturation
   *
   * @param {Number} saturationIncerement
   */
  async incrementSaturation(saturationIncerement) {
    await this._client.putRequest('state', {
      sat: { increment: saturationIncerement }
    });
  }
}

export default NanoleafClient;
