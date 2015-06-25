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
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});

// Test this by using telnet:

// telnet localhost 8124
// to quit:
// 1. Open the telnet prompt by holding down the ‘Ctrl’ key and push the ‘]’ key. (prompt: Microsoft Telnet>)
// 2. Type quit.
// 3. Push the ‘Enter’ key.