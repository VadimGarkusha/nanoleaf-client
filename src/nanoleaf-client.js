import {
  Brightness,
  ColorTemperature,
  GlobalOrientation,
  Hue,
  PowerStatus,
  Saturation,
  HttpError,
  HttpResponse,
  Info
} from './models/index.js';
import NanoleafHttpClient from './nanoleaf-http-client.js';

/**
 * Http client for Nanoleaf Aurora devices
 */
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
   * @returns {Promise<PowerStatus>|Promise<HttpError>}
   */
  getPowerStatus() {
    return this._client.getRequest('state/on')
      .then(response => {
        return (response instanceof HttpError) ? response : new PowerStatus(response);
      });
  }

  /**
   * TODO: Add model
   */
  getInfo() {
    return this._client.getRequest()
      .then(response => {
        return (response instanceof HttpError) ? response : new Info(response);
      });
  }

  /**
   *  Turn on device
   * 
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  turnOn() {
    return this._client.putRequest('state', {
      on: { value: true }
    });
  }

  /**
   * Turn off device
   * 
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  turnOff() {
    return this._client.putRequest('state', { on: { value: false } });
  }

  /**
   * Get authorization token
   *
   * @returns {string} Auth token
   */
  authorize() {
    const response = this._client.postRequest('new');
    this._client.authorize(response.auth_token);

    return response.auth_token;
  }

  /**
   * Get current saturation
   *
   * @returns {Saturation}
   */
  getSaturation() {
    const response = this._client.getRequest('state/sat');
    return (response instanceof HttpError) ? response : new Saturation(response);
  }

  /**
   * Set saturation
   *
   * @param {Number} value
   */
  setSaturation(value) {
    return this._client.putRequest('state', {
      sat: { value }
    });
  }

  /**
   * Increase saturation
   *
   * @param {Number} increment
   */
  incrementSaturation(increment) {
    return this._client.putRequest('state', {
      sat: { increment }
    });
  }

  /**
   * Get brightness
   *
   * @returns {Brightness}
   */
  getBrightness() {
    const response = this._client.getRequest('state/brightness');

    return (response instanceof HttpError) ? response : new Brightness(response);
  }

  /**
   * Set Brightness
   *
   * @param {number} value
   */
  setBrightness(value) {
    return this._client.putRequest('state', {
      brightness: { value }
    });
  }

  /**
   * Increase Brightness
   *
   * @param {number} increment
   */
  increaseBrightness(increment) {
    return this._client.putRequest('state', {
      brightness: { increment }
    });
  }

  /**
   * Set Brightness with duration
   *
   * @param {number} value
   * @param {number} duration
   */
  setBrightness(value, duration) {
    return this._client.putRequest('state', {
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
  getHue() {
    const response = this._client.getRequest('state/hue');

    return (response instanceof HttpError) ? response : new Hue(response);
  }

  /**
   * Set hue
   *
   * @param {number} value
   */
  setHue(value) {
    return this._client.putRequest('state', {
      hue: { value }
    });
  }

  /**
   * Increase hue
   *
   * @param {number} increment
   */
  increaseHue(increment) {
    return this._client.putRequest('state', {
      hue: { increment }
    });
  }

  /**
   * Get Color Temperature
   *
   * @returns {ColorTemperature}
   */
  getColorTemperature() {
    const response = this._client.getRequest('state/ct');

    return (response instanceof HttpError) ? response : new ColorTemperature(response);
  }

  /**
   * Set Color Temperature
   *
   * @param {number} value
   */
  setColorTemperature(value) {
    return this._client.putRequest('state', {
      ct: { value }
    });
  }

  /**
   * Increase Color Temperature
   *
   * @param {Number} increment
   */
  incrementColorTemperature(increment) {
    return this._client.putRequest('state', {
      ct: { increment }
    });
  }

  /**
   * Get Color Mode
   *
   * @returns {string}
   */
  getColorMode() {
    const response = this._client.getRequest('state/colorMode');

    return response;
  }

  /**
   * Get Effect
   *
   * @returns {string}
   */
  getEffect() {
    const response = this._client.getRequest('effects/select');

    return response;
  }

  /**
   * Set Effect
   *
   * @param {number} value
   */
  setEffect(value) {
    return this._client.putRequest('effects', {
      select: { value }
    });
  }

  /**
   * Get List of available Effects
   *
   * @returns {string[]}
   */
  getEffectList() {
    const response = this._client.getRequest('effects/effectsList');

    return response;
  }

  /**
   * Get Global Orientation
   *
   * @returns {GlobalOrientation}
   */
  getGlobalOrientation() {
    const response = this._client.getRequest('panelLayout/globalOrientation');

    return (response instanceof HttpError) ? response : new GlobalOrientation(response);
  }

  /**
   * Set Global Orientation
   *
   * @param {number} value
   */
  setGlobalOrientation(value) {
    return this._client.putRequest('panelLayout', {
      globalOrientation: { value }
    });
  }
}

export default NanoleafClient;
