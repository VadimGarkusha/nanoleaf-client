import {
  Brightness,
  ColorTemperature,
  GlobalOrientation,
  Hue,
  PowerStatus,
  Saturation,
  HttpError,
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
    return this._client.getRequest('state/on').then(response => {
      return response instanceof HttpError
        ? response
        : new PowerStatus(response);
    });
  }

  /**
   * Get device info
   *
   * @returns {Promise<Info>|Promise<HttpError>}
   */
  getInfo() {
    return this._client.getRequest().then(response => {
      return response instanceof HttpError ? response : new Info(response);
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
   * @returns {Promise<string>|Promise<HttpError>} Auth token
   */
  authorize() {
    return this._client.postRequest('new').then(response => {
      const { auth_token } = response;
      this._client.authorize(auth_token);

      return response instanceof HttpError ? response : auth_token;
    });
  }

  /**
   * Get current saturation
   *
   * @returns {Promise<Saturation>|Promise<HttpError>}
   */
  getSaturation() {
    return this._client.getRequest('state/sat').then(response => {
      return response instanceof HttpError
        ? response
        : new Saturation(response);
    });
  }

  /**
   * Set saturation
   *
   * @param {Promise<HttpResponse>|Promise<HttpError>} value
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  setSaturation(value) {
    return this._client.putRequest('state', {
      sat: { value }
    });
  }

  /**
   * Increase saturation
   *
   * @param {number} increment
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
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

    return response instanceof HttpError ? response : new Brightness(response);
  }

  /**
   * Set Brightness
   *
   * @param {number} value
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
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
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
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
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  setDurationBrightness(value, duration) {
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
   * @returns {Promise<Hue>|Promise<HttpError>}
   */
  getHue() {
    return this._client.getRequest('state/hue').then(response => {
      return response instanceof HttpError ? response : new Hue(response);
    });
  }

  /**
   * Set hue
   *
   * @param {number} value
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
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
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  increaseHue(increment) {
    return this._client.putRequest('state', {
      hue: { increment }
    });
  }

  /**
   * Get Color Temperature
   *
   * @returns {Promise<ColorTemperature>|Promise<HttpError>}}
   */
  getColorTemperature() {
    return this._client.getRequest('state/ct').then(response => {
      return response instanceof HttpError
        ? response
        : new ColorTemperature(response);
    });
  }

  /**
   * Set Color Temperature
   *
   * @param {number} value
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  setColorTemperature(value) {
    return this._client.putRequest('state', {
      ct: { value }
    });
  }

  /**
   * Increase Color Temperature
   *
   * @param {number} increment
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  incrementColorTemperature(increment) {
    return this._client.putRequest('state', {
      ct: { increment }
    });
  }

  /**
   * Get Color Mode
   *
   * @returns {Promise<string>|Promise<HttpError>}
   */
  getColorMode() {
    return this._client.getRequest('state/colorMode');
  }

  /**
   * Get Effect
   *
   * @returns {Promise<string>|Promise<HttpError>}
   */
  getEffect() {
    return this._client.getRequest('effects/select');
  }

  /**
   * Set Effect
   *
   * @param {number} value
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  setEffect(value) {
    return this._client.putRequest('effects', {
      select: { value }
    });
  }

  /**
   * Get List of available Effects
   *
   * @returns {Promise<string[]>|Promise<HttpError>}
   */
  getEffectList() {
    return this._client.getRequest('effects/effectsList');
  }

  /**
   * Get Global Orientation
   *
   * @returns {Promise<GlobalOrientation>|Promise<HttpError>}
   */
  getGlobalOrientation() {
    return this._client
      .getRequest('panelLayout/globalOrientation')
      .then(response => {
        return response instanceof HttpError
          ? response
          : new GlobalOrientation(response);
      });
  }

  /**
   * Set Global Orientation
   *
   * @param {number} value
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  setGlobalOrientation(value) {
    return this._client.putRequest('panelLayout', {
      globalOrientation: { value }
    });
  }
}

export default NanoleafClient;
