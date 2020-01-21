import NanoleafClient from './src/nanoleaf-client.js';

var ip = '192.168.0.10';
var token = 'qEQ8ZLcPuOVesarDXIW6eGQQd1Hhn1d9';

const client = new NanoleafClient(ip, token);
// client.authorize();
//httpClient.addUserRequest();

client.getInfo().then(res => {
    console.log('RESPONSE', res);
}, (error) => {
    console.log('ERROR', error)
});