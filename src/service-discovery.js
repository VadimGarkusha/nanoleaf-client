import NanoleafDevice from './models/nanoleaf-device.js';
import dgram from 'dgram';
import c from './../const.js';

class ServiceDiscovery {
    _broadcastSsdp(socket) {
        var query = Buffer.from(
          'M-SEARCH * HTTP/1.1\r\n' +
            `HOST: ${c.SSDP_DEFAULT_IP}:${c.SSDP_DEFAULT_PORT}\r\n` +
            'MAN: "ssdp:discover"\r\n' +
            'MX: 1\r\n' +
            `ST: ${c.NANOLEAF_AURORA_TARGET}\r\n\r\n`
        );
      
        socket.send(query, 0, query.length, c.SSDP_DEFAULT_PORT, c.SSDP_DEFAULT_IP);
    }
      
    createSocket() {
        var socket = dgram.createSocket('udp4');
        var devices = [];
        let self = this;

        socket.on('listening', function() {
          console.log('socket ready...');
          self._broadcastSsdp(socket);
        });
      
        socket.on('message', function(chunk, info) {
          console.log('[incoming] UDP message');
          console.log(info);
          devices.push(new NanoleafDevice(info));
          var response = chunk.toString().trim().split('\r\n');
            
          console.log('res', response);
          response.forEach(item => {
            var splitter = item.indexOf(':');

            if(splitter > -1) {
                let key = item.slice(0, splitter);
                let value = item.slice(splitter, item.length);
                console.log(`SPLITTER: ${splitter}, KEY: ${key}, VALUE: ${value}`);
            }
          });

          //console.log('MESSAGE', chunk.toString().trim().split('\r\n'));
          //console.log(devices);
        });
      
        console.log('binding to', c.ANY_IP + ':' + c.SSDP_SOURCE_PORT);
        socket.bind(c.SSDP_SOURCE_PORT, c.ANY_IP);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                socket.close();
                resolve(devices);
              }, 3000);
        });
    }
}

export default ServiceDiscovery;
