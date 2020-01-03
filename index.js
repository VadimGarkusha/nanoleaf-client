import c from './const.js';
import NanoleafClient from './src/nanoleaf-client.js';
import NanoleafHttpClient from './src/nanoleaf-http-client.js';
import dgram from 'dgram';

const client = new NanoleafClient(
  '192.168.0.21',
  's5rpY3tsHxq75I0jI4Z5aUsavcTxc9lZ'
);
const httpClient = new NanoleafHttpClient('192.168.0.21');

//client.getPowerStatus();
client.turnOn();
//client.getInfo();

function broadcastSsdp(socket) {
  var query = Buffer.from(
    'M-SEARCH * HTTP/1.1\r\n' +
      `HOST: ${c.SSDP_DEFAULT_IP}:${c.SSDP_DEFAULT_PORT}\r\n` +
      'MAN: "ssdp:discover"\r\n' +
      'MX: 1\r\n' +
      `ST: ${c.NANOLEAF_AURORA_TARGET}\r\n\r\n`
  );

  socket.send(query, 0, query.length, c.SSDP_DEFAULT_PORT, c.SSDP_DEFAULT_IP);
}

function createSocket() {
  var socket = dgram.createSocket('udp4');

  socket.on('listening', function() {
    console.log('socket ready...');
    broadcastSsdp(socket);
  });

  socket.on('message', function(chunk, info) {
    console.log('[incoming] UDP message');
    console.log(info);
    console.log('MESSAGE', chunk.toString());
  });

  console.log('binding to', c.ANY_IP + ':' + c.SSDP_SOURCE_PORT);
  socket.bind(c.SSDP_SOURCE_PORT, c.ANY_IP);

  setTimeout(() => {
    socket.close();
  }, 3000);
}

//createSocket();
