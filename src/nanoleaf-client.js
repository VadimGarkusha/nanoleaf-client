import {
  Brightness,
  ColorTemperature,
  GlobalOrientation,
  Hue,
  PowerStatus,
  Saturation,
  Info,
  Effect,
  EffectsDetails
} from './models/index.js';
import NanoleafHttpClient from './nanoleaf-http-client.js';
import convert from 'color-convert';

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
      return new PowerStatus(response);
    });
  }

  /**
   * Get device info
   *
   * @returns {Promise<Info>|Promise<HttpError>}
   */
  getInfo() {
    return this._client.getRequest().then(response => {
      return new Info(response);
    });
  }

  /**
   * Identify panels
   * 
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  identify() {
    return this._client.putRequest('identify');
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
   * Switch power on/off
   * 
   * @param {boolean} power 
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  power(power) {
    return this._client.putRequest('state', { on: { value: power } });
  }

  /**
   * Get authorization token
   *
   * @returns {Promise<string>|Promise<HttpError>} Auth token
   */
  authorize() {
    return this._client.postRequest('new').then((response) => {
      const { auth_token } = response.data;
      this._client.authorize(auth_token);

      return auth_token;
    });
  }

  /**
   * Get current saturation
   *
   * @returns {Promise<Saturation>|Promise<HttpError>}
   */
  getSaturation() {
    return this._client.getRequest('state/sat').then(response => {
      return new Saturation(response);
    });
  }

  /**
   * Set saturation
   *
   * @param {number} value
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
   * @returns {Promise<Brightness>|Promise<HttpError>}
   */
  getBrightness() {
    return this._client.getRequest('state/brightness').then(response => {
      return new Brightness(response);
    });
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
      return new Hue(response);
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
      return new ColorTemperature(response);
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
   * Get Selected Effect
   *
   * @returns {Promise<string>|Promise<HttpError>}
   */
  getSelectedEffect() {
    return this._client.getRequest('effects/select');
  }

  /**
   * Get Effect Info
   * 
   * @param {string} effectName 
   * @returns {Promise<Effect>|Promise<HttpError>}
   */
  getEffectInfo(effectName) {
    return this._client.putRequest('effects', {
      write: {
        command: 'request',
        animName: effectName
      }
    }).then(response => {
      return new Effect(response.data);
    });
  }

  /**
   * Get all effects information
   * 
   * @returns {Promise<EffectsDetails>|Promise<HttpError>}
   */
  getEffectsInfo() {
    return this._client.putRequest('effects', {
      write: {
        command: 'requestAll'
      }
    }).then(response => {
      return new EffectsDetails(response.data);
    });
  }

  /**
   * Set Effect
   *
   * @param {string} value
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  setEffect(value) {
    return this._client.putRequest('effects', {
      select: value
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
        return new GlobalOrientation(response);
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

  /**
   * Set hsv color
   * 
   * @param {number} h 
   * @param {number} s 
   * @param {number} v
   * 
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  setHsvColor(h, s, v) {
    const huePromise = this.setHue(h);
    const satPromise = this.setSaturation(s);
    const brightnessPromise = this.setBrightness(v);

    return Promise.all([huePromise, satPromise, brightnessPromise]).then(res => {
      return res[0];
    }, error => {
      throw error;
    });
  }

  /**
   * Set hsl color
   * 
   * @param {number} h 
   * @param {number} s 
   * @param {number} l
   * 
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  setHslColor(h, s, l) {
    const hsv = convert.hsl.hsv([h, s, l]);

    return this.setHsvColor(hsv[0], hsv[1], hsv[2]);
  }

  /**
   * Set hex color
   * 
   * @param {string} hexString
   * 
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  setHexColor(hexString) {
    const hsv = convert.hex.hsv(hexString);

    return this.setHsvColor(hsv[0], hsv[1], hsv[2]);
  }

  /**
   * Set rgb color
   * 
   * @param {number} r
   * @param {number} g 
   * @param {number} b
   * 
   * @returns {Promise<HttpResponse>|Promise<HttpError>}
   */
  setRgbColor(r, g, b) {
    const hsv = convert.rgb.hsv([r, g, b]);

    return this.setHsvColor(hsv[0], hsv[1], hsv[2]);
  }
}

export default NanoleafClient;