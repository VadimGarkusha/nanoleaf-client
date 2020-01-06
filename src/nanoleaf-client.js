import PowerStatus from './models/power-status.js';
import Saturation from './models/saturation.js';
import NanoleafHttpClient from './nanoleaf-http-client.js';
import Brightness from './models/brightness.js';
import Hue from './models/hue.js';

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
   * @returns {PowerStatus}
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
   * Turn off device
   */

  async turnOff() {
    return await this._client.putRequest('state', { on: { value: false } });
  }

  /**
   * Get and save token for http-client
   */
  async authorizeUser() {
    const response = await this._client.postRequest('new/');
  }

  /**
   * Get current saturation
   *
   * @returns {Saturation}
   */
  async getSaturation() {
    var response = await this._client.getRequest('state/sat');

    return new Saturation(response);
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

  /**
   * Get brightness
   * 
   * @returns {Brightness}
   */
  async getBrightness() {
    var response = await this._client.getRequest('state/brightness');

    return new Brightness(response);
  }

  /**
   * Set Brightness
   * 
   * @param {number} value
   */
  async setBrightness(value) {
    await this._client.putRequest('state', {
      brightness: { value: value }
    });
  }

  /**
   * Increase Brightness
   * 
   * @param {number} value
   */
  async increaseBrightness(value) {
    await this._client.putRequest('state', {
      brightness: { increment: value }
    });
  }

  /**
   * Set Brightness with duration
   * 
   * @param {number} value
   * @param {number} duration
   */
  async setBrightness(value, duration) {
    await this._client.putRequest('state', {
      brightness: {
        value: value,
        duration: duration
      }
    });
  }

  /**
   * Get hue
   * 
   * @returns {Hue}
   */
  async getHue() {
    var response = await this._client.getRequest('state/hue');

    return new Hue(response);
  }

  /**
   * Set hue
   * 
   * @param {number} value
   */
  async setHue(value) {
    await this._client.putRequest('state', {
      hue: { value: value }
    });
  }

  /**
   * Increase hue
   * 
   * @param {number} value
   */
  async increaseHue(value) {
    await this._client.putRequest('state', {
      hue: { increment: value }
    });
  }
}

export default NanoleafClient;
