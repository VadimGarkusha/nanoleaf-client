# nanoleaf-client

<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/BullFrog13/Nanoleaf-Client/blob/master/nano1.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Nanoleaf Client</h3>
</p>

[![NPM version](https://img.shields.io/npm/v/nanoleaf-client)](https://www.npmjs.com/package/nanoleaf-client)  ![MIT License](https://img.shields.io/npm/l/nanoleaf-client)    ![Bundle size](https://img.shields.io/bundlephobia/min/nanoleaf-client)
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

Be careful with IPs! Sometimes, if you plug off the device or a router an IP address might change.

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
