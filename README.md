# nanoleaf-client

<br />
<p align="center">
  <a>
    <img src="./resources/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Nanoleaf Client</h3>
</p>

[![NPM version](https://img.shields.io/npm/v/nanoleaf-client)](https://www.npmjs.com/package/nanoleaf-client)
[![MIT License](https://img.shields.io/npm/l/nanoleaf-client)](https://img.shields.io/npm/l/nanoleaf-client)
[![Bundle size](https://img.shields.io/bundlephobia/min/nanoleaf-client)](https://img.shields.io/bundlephobia/min/nanoleaf-client)
[![Build](https://img.shields.io/travis/com/VadimGarkusha/nanoleaf-client)](https://travis-ci.com/VadimGarkusha/nanoleaf-client)
[![Coverage Status](https://coveralls.io/repos/github/VadimGarkusha/nanoleaf-client/badge.svg)](https://coveralls.io/github/VadimGarkusha/nanoleaf-client)

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

### Cloning and the GitHub repository
The recommended way to get Nanoleaf Client is to use git to directly clone repository:

```bash
$ git clone https://github.com/VadimGarkusha/nanoleaf-client.git
```

This will clone the latest version of the Nanoleaf Client repository.

### Installing the npm package
To install the dependencies, run this in the application folder from the command-line:

```bash
$ npm install nanoleaf-client
```

## Service Discovery

In order to use the client you need to know your device IP on the network and a user token.

Get device IP. NOTE: before running this command make sure the device is plugged in and is connected to the network. You can check it with phone app.

Be careful with IPs! Sometimes, if you plug out the device or a router an IP address might change.

### Getting device IP
```javascript
import { ServiceDiscovery } from 'nanoleaf-client';

let serviceDiscovery = new ServiceDiscovery();

serviceDiscovery.discoverNanoleaf().then(devices => {

  // devices is an array of all Nanoleaf devices found on the network.
  // device info contains location info, uuid and device Id.
  console.log(devices);
});
```

### Getting token
Before executing this command, hold power button on your nanoleaf device for 5 seconds until the white LED starts glowing. After that you have 30 seconds to execute this command and get a token. Client will be authorized automatically.

NOTE: Device can hold up to 5 tokens. New tokens come in FIFO order.
```javascript
client.authorize().then(token => {
    console.log(token);
}).catch(err => {
    console.log(err);
});
```

## Supported Methods

### [Nanoleaf Client](https://github.com/VadimGarkusha/nanoleaf-client/blob/master/src/nanoleaf-client.js)

#### General Requests

* `getInfo()` - returns __object__ with information about current state of device
* `identify()` - causes panels to flash in unison, returns response with status if successful
* `authorize()` - authorizes nanoleaf client for future requests and returns __string__ auth token
* `getGlobalOrientation()` - returns __object__ with global orientation value

#### Power
* `turnOn()` - turns on the device
* `turnOff()` - turns off the device
* `power(power)` - accepts __boolean__ parameter and sets device power status
* `getPowerStatus()` - returns __object__ with power status

#### Saturation
* `getSaturation()` - returns __object__ with current saturation value
* `setSaturation(value)` - accepts __numerical__ parameter and sets saturation value
* `incrementSaturation(increment)` - accepts __numerical__ parameter and incerements saturation value by it

#### Brightness
* `getBrightness()` - returns __object__ with current brightness value
* `setBrightness(value)` - accepts __numerical__ parameter and sets brightness value
* `increaseBrightness(increment)` - accepts __numerical__ parameter and incerements brightness value by it
* `setDurationBrightness(value, duration)` - accepts two __numerical__ parameter and sets brightness `value` for `duration` period

#### Hue
* `getHue()` - returns __object__ with current hue value
* `setHue(value)` - accepts __numerical__ parameter and sets hue value
* `increaseHue(increment)` - accepts __numerical__ parameter and incerements hue value by it

#### Color Temperature
* `getColorTemperature()` - returns __current__ color temperature value
* `setColorTemperature(value)` - accepts __numerical__ parameter and sets color temperature value
* `incrementColorTemperature(increment)` - accepts __numerical__ parameter and incerements color temperature value by it

#### Effect/Theme
* `getColorMode()` - returns __string__ with current color temperature value `ct` (color temperature), `hs` (hue/saturation), or `effect`
* `getSelectedEffect()` - returns __string__ with selected effect
* `getEffectInfo(effectName)` - accepts __string__ with effect name and returns __object__ with effect properties
* `setEffect(value)` - accepts __string__ with effect names and sets it as current effect
* `getEffectList()` - returns __array of strings__ with available effects

#### Color
* `setHsvColor(h, s, v)` - accepts three __numerical__ parameters and sets hsv color based on them 
* `setHslColor(h, s, l)` - accepts three __numerical__ parameters and sets hsl color based on them 
* `setHexColor(hexString)` - accepts __string__ parameter with hex values and sets color based on it
* `setRgbColor(r, g, b)` - accepts three __numerical__ parameters and sets rgb color based on them 

## Examples

### Setting up client
```javascript
import { NanoleafClient } from 'nanoleaf-client';

 let client = new NanoleafClient('<device_ip>', '<user_token>');

// For example
let client = new NanoleafClient('192.168.0.10', 'qEQ8ZLcPuOVesarDXIW6eGQQd1Hhn1d9');

// Without token
let noTokenClient = new NanoleafClient('192.168.0.10');

// Adding token later
noTokenClient.authorize('qEQ8ZLcPuOVesarDXIW6eGQQd1Hhn1d9');
```

### Turn on/off
```javascript
client.turnOn().then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});

client.turnOff().then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
```

### Get device info
```javascript
client.getInfo().then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
```

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
