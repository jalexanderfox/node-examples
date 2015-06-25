// Here is an example of a client of echo server as described previously:

var net = require('net');
var client = net.connect({path: '/tmp/echo.sock'});
    function() { //'connect' listener
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', function(data) {
  console.log(data.toString());
  client.end();
});
client.on('end', function() {
  console.log('disconnected from server');
});