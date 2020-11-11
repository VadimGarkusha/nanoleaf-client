/**
 * @property {string} version
 * @property {string} animName
 * @property {string} animType
 * @property {string} colorType
 * @property {Object.[{number, number, number, numer}]} palette
 * @property {string} pluginType
 * @property {string} pluginUuid
 * @property {Object.[{string, number}]} pluginOptions
 * @property {boolean} hasOverlay
 */
class Effect {
  constructor(obj) {
    this.version = obj.version;
    this.animName = obj.animName;
    this.animType = obj.animType;
    this.colorType = obj.colorType;
    this.palette = obj.palette;
    this.pluginType = obj.pluginType;
    this.pluginUuid = obj.pluginUuid;  
    this.pluginOptions = obj.pluginOptions;  
    this.hasOverlay = obj.hasOverlay;
  }
}

export default Effect;