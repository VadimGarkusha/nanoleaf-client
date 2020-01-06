import NanoleafClient from './src/nanoleaf-client.js';
import ServiceDiscovery from './src/service-discovery.js';

var ip = '192.168.0.10';
var token = 'qEQ8ZLcPuOVesarDXIW6eGQQd1Hhn1d9';
const discovery = new ServiceDiscovery();

discovery.createSocket().then(response => {
  console.log('RESPONSE: ', response);
});

const client = new NanoleafClient(
  ip, token
);
//const httpClient = new NanoleafHttpClient(ip);

//httpClient.addUserRequest();


// Power

//client.getPowerStatus();
//client.turnOn();
//client.turnOff();

// Brightness

//client.increaseBrightness(25, 5);
// var response = client.getBrightness();
// console.log(response);

// Hue

//var response = client.getHue();
//var response = client.setHue(0);
//console.log(response);
