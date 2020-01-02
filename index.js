var c = require('./const');
let NanoleafHttpClient = require('./nanoleaf-http-client');
var dgram = require('dgram');

console.log("Hello World!");

//var client = new NanoleafHttpClient('192.168.0.10', 'qEQ8ZLcPuOVesarDXIW6eGQQd1Hhn1d9');

let client = new NanoleafHttpClient('192.168.0.10', 'qEQ8ZLcPuOVesarDXIW6eGQQd1Hhn1d9').getRequest('state');

//var r = test.NanoleafHttpClient('192.168.0.10', 'qEQ8ZLcPuOVesarDXIW6eGQQd1Hhn1d9');
// function getState() {
//   client.get('state');
// }

//getState();


function broadcastSsdp(socket) {
    var query = Buffer.from(
        'M-SEARCH * HTTP/1.1\r\n'
    + `HOST: ${c.SSDP_DEFAULT_IP}:${c.SSDP_DEFAULT_PORT}\r\n`
    + 'MAN: "ssdp:discover"\r\n'
    + 'MX: 1\r\n'
    + `ST: ${c.NANOLEAF_AURORA_TARGET}\r\n\r\n`);
  
    socket.send(query, 0, query.length, c.SSDP_DEFAULT_PORT, c.SSDP_DEFAULT_IP);
  }

function createSocket() {
    var socket = dgram.createSocket('udp4');

    socket.on('listening', function () {
      console.log('socket ready...');
      broadcastSsdp(socket);
    });
  
    socket.on('message', function (chunk, info) {  
      console.log('[incoming] UDP message');
      console.log(info);
      console.log('MESSAGE', chunk.toString());
    });
  
    console.log('binding to', c.ANY_IP + ':' + c.SSDP_SOURCE_PORT);
    socket.bind(c.SSDP_SOURCE_PORT, c.ANY_IP);

    setTimeout(() => {
        socket.close();
    }, 3000)
  }

//createSocket();