var request = require('request');
var dgram = require('dgram');
var c = require('./const');

console.log("Hello World!");

var NanoleafApi = module.exports = function (options) {
    var self = this;

    this.testRequest = () => {
        request('http://www.google.com', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });
    }
}

//let test = new NanoleafApi();
//test.testRequest();

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

// createSocket();