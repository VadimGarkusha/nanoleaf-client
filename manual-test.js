import NanoleafClient from './src/nanoleaf-client.js';

var ip = '192.168.0.10';
var token = 'TkBrfZYlQ9CthkemgjdXoigFGdHBj2e6';

const client = new NanoleafClient(ip, token);
// client.authorize();
// httpClient.addUserRequest();

// Power

// client.getPowerStatus();

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

client.setHsvColor(233, 77, 29).then(res => {
  console.log('RES', res);
}, err => {
  console.log('ERROR', err);
});

client.setHslColor(233, 62.6, 17.83).then(res => {
  console.log('RES', res);
}, err => {
  console.log('ERROR', err);
});

client.setHexColor('#11184a').then(res => {
  console.log('RES', res);
}, err => {
  console.log('ERROR', err);
});

client.setRgbColor(17.01, 23.65, 73.95).then(res => {
  console.log('RES', res);
}, err => {
  console.log('ERROR', err);
});