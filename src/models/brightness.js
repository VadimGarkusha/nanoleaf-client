/**
 * @property {number} value
 * @property {number} min
 * @property {number} max
 */
class Brightness {
  constructor(obj) {
    this.value = obj.value;
    this.min = obj.min;
    this.max = obj.max;
  }
}
  
export default Brightness;