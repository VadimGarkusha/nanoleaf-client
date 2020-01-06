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
   * Turn off device
   */

  async turnOff() {
    return await this._client.putRequest('state', { on: { value: false } });
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

  /**
   * Get brightness
   */
  async getBrightness() {
    var response = await this._client.getRequest('state/brightness');

    return new Brightness(response);
  }

  /**
   * Set Brightness
   */
  async setBrightness(value) {
    await this._client.putRequest('state', {
      brightness: { value: value }
    });
  }

  /**
   * Increase Brightness
   */
  async increaseBrightness(value) {
    await this._client.putRequest('state', {
      brightness: { increment: value }
    });
  }

  /**
   * Set Brightness with duration
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
   */
  async getHue() {
    var response = await this._client.getRequest('state/hue');

    return new Hue(response);
  }

  /**
   * Set hue
   */
  async setHue(value) {
    await this._client.putRequest('state', {
      hue: { value: value }
    });
  }

  /**
   * Increase hue
   */
  async increaseHue(value) {
    await this._client.putRequest('state', {
      hue: { increment: value }
    });
  }
}

export default NanoleafClient;
