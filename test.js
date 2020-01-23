import NanoleafClient from './src/nanoleaf-client.js';

var ip = '192.168.0.21';
var token = 's5rpY3tsHxq75I0jI4Z5aUsavcTxc9lZ';

const client = new NanoleafClient(ip, token);
// client.authorize();
//httpClient.addUserRequest();

// Power

//client.getPowerStatus();
client.getEffectList().then(
  res => {
    console.log('RESPONSE', res);
  },
  error => {
    console.log('ERROR', error);
  }
);
