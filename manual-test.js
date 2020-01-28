import NanoleafClient from './src/nanoleaf-client.js';

var ip = '192.168.0.21';
var token = 's5rpY3tsHxq75I0jI4Z5aUsavcTxc9lZ';

const client = new NanoleafClient(ip, token);
// client.authorize();
//httpClient.addUserRequest();

// Power

//client.getPowerStatus();
client.getInfo().then(
  res => {
    console.log('RESPONSE', res);
  },
  error => {
    console.log('ERROR', error);
  }
);

client.getBrightness().then(
  res => {
    console.log('RESPONSE', res);
  },
  error => {
    console.log('ERROR', error);
  }
);

client.getColorMode().then(
  res => {
    console.log('RESPONSE', res);
  },
  error => {
    console.log('ERROR', error);
  }
);

client.getColorTemperature().then(
  res => {
    console.log('RESPONSE', res);
  },
  error => {
    console.log('ERROR', error);
  }
);

client.getEffect().then(
  res => {
    console.log('RESPONSE', res);
  },
  error => {
    console.log('ERROR', error);
  }
);

client.getEffectList().then(
  res => {
    console.log('RESPONSE', res);
  },
  error => {
    console.log('ERROR', error);
  }
);

client.getHue().then(
  res => {
    console.log('RESPONSE', res);
  },
  error => {
    console.log('ERROR', error);
  }
);

client.getGlobalOrientation().then(
  res => {
    console.log('RESPONSE', res);
  },
  error => {
    console.log('ERROR', error);
  }
);

client.getPowerStatus().then(
  res => {
    console.log('RESPONSE', res);
  },
  error => {
    console.log('ERROR', error);
  }
);
