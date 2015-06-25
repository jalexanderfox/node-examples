// Here is an example of an echo server which listens for connections on port 8124:

var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.listen('/tmp/echo.sock', function() { //'listening' listener
  console.log('server bound');
});

// Use nc to connect to a UNIX domain socket server:

// nc -U /tmp/echo.sock