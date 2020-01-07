import PowerStatus from './models/power-status.js';
import Saturation from './models/saturation.js';
import NanoleafHttpClient from './nanoleaf-http-client.js';
import Brightness from './models/brightness.js';
import Hue from './models/hue.js';
import ColorTemperature from './models/color-temperature.js';
import GlobalOrientation from './models/global-orientation.js';

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
   * TODO: Add model
   */
  async getInfo() {
    return await this._client.getRequest();
  }

  /**
   *  Turn on device
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
    const response = await this._client.getRequest('state/sat');

    return new Saturation(response);
  }

  /**
   * Set saturation
   *
   * @param {Number} value
   */
  async setSaturation(value) {
    await this._client.putRequest('state', {
      sat: { value }
    });
  }

  /**
   * Increase saturation
   *
   * @param {Number} increment
   */
  async incrementSaturation(increment) {
    await this._client.putRequest('state', {
      sat: { increment }
    });
  }

  /**
   * Get brightness
   *
   * @returns {Brightness}
   */
  async getBrightness() {
    const response = await this._client.getRequest('state/brightness');

    return new Brightness(response);
  }

  /**
   * Set Brightness
   *
   * @param {number} value
   */
  async setBrightness(value) {
    await this._client.putRequest('state', {
      brightness: { value }
    });
  }

  /**
   * Increase Brightness
   *
   * @param {number} increment
   */
  async increaseBrightness(increment) {
    await this._client.putRequest('state', {
      brightness: { increment }
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
        value,
        duration
      }
    });
  }

  /**
   * Get hue
   *
   * @returns {Hue}
   */
  async getHue() {
    const response = await this._client.getRequest('state/hue');

    return new Hue(response);
  }

  /**
   * Set hue
   *
   * @param {number} value
   */
  async setHue(value) {
    await this._client.putRequest('state', {
      hue: { value }
    });
  }

  /**
   * Increase hue
   *
   * @param {number} increment
   */
  async increaseHue(increment) {
    await this._client.putRequest('state', {
      hue: { increment }
    });
  }

  /**
   * Get Color Temperature
   *
   * @returns {ColorTemperature}
   */
  async getColorTemperature() {
    const response = await this._client.getRequest('state/ct');

    return new ColorTemperature(response);
  }

  /**
   * Set Color Temperature
   *
   * @param {number} value
   */
  async setColorTemperature(value) {
    await this._client.putRequest('state', {
      ct: { value }
    });
  }

  /**
   * Increase Color Temperature
   *
   * @param {Number} increment
   */
  async incrementColorTemperature(increment) {
    await this._client.putRequest('state', {
      ct: { increment }
    });
  }

  /**
   * Get Color Mode
   *
   * @returns {string}
   */
  async getColorMode() {
    const response = await this._client.getRequest('state/colorMode');

    return response;
  }

  /**
   * Get Effect
   *
   * @returns {string}
   */
  async getEffect() {
    const response = await this._client.getRequest('effects/select');

    return response;
  }

  /**
   * Set Effect
   *
   * @param {number} value
   */
  async setEffect(value) {
    await this._client.putRequest('effects', {
      select: { value }
    });
  }

  /**
   * Get List of available Effects
   *
   * @returns {string[]}
   */
  async getEffectList() {
    const response = await this._client.getRequest('effects/effectsList');

    return response;
  }

  /**
   * Get Global Orientation
   *
   * @returns {GlobalOrientation}
   */
  async getGlobalOrientation() {
    const response = await this._client.getRequest(
      'panelLayout/globalOrientation'
    );

    return new GlobalOrientation(response);
  }

  /**
   * Set Global Orientation
   *
   * @param {number} value
   */
  async setGlobalOrientation(value) {
    await this._client.putRequest('panelLayout', {
      globalOrientation: { value }
    });
  }
}

export default NanoleafClient;
