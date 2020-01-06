import NanoleafClient from './src/nanoleaf-client.js';
import ServiceDiscovery from './src/service-discovery.js';
import NanoleafDevice from './src/models/nanoleaf-device.js';

var ip = '192.168.0.10';
var token = 'qEQ8ZLcPuOVesarDXIW6eGQQd1Hhn1d9';

//  Service Discovery

// let client;
// const discovery = new ServiceDiscovery();
// let promise = discovery.discoverNanoleaf();

// promise.then(response => {
//   client = new NanoleafClient(
//     response[0].location.hostname, token
//   );

//   client.turnOff();
// });

const client = new NanoleafClient(ip, token);

//httpClient.addUserRequest();


// Power

//client.getPowerStatus();
//client.turnOn();
client.turnOff();

// Brightness

//client.increaseBrightness(25, 5);
// var response = client.getBrightness();
// console.log(response);

// Hue

//var response = client.getHue();
//var response = client.setHue(0);
//console.log(response);
