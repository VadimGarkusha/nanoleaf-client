/**
 * @property {string} name Device name
 * @property {string} serialNo Serial number
 * @property {string} manufacturer Manufacturer
 * @property {string} firmwareVersion Firmware version
 * @property {string} hardwareVersion Hardware version
 * @property {object} model Device model
 * @property {object} effects Effects
 * @property {object} panelLayout Panel Layout
 * @property {object} rhythm Rhytm info
 * @property {object} schedules Schedules
 * @property {object} state State
 */
class Info {
  constructor(obj) {
    this.name = obj.name;
    this.serialNo = obj.serialNo;
    this.manufacturer = obj.manufacturer;
    this.firmwareVersion = obj.firmwareVersion;
    this.hardwareVersion = obj.hardwareVersion;
    this.model = obj.model;
    this.effects = obj.effects;
    this.panelLayout = obj.panelLayout;
    this.rhythm = obj.rhythm;
    this.schedules = obj.schedules;
    this.state = obj.state;
  }
}
  
export default Info;