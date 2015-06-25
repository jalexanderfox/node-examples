var tls = require('tls');
var fs = require('fs');

var options = {
  pfx: fs.readFileSync('server.pfx'),

  // This is necessary only if using the client certificate authentication.
  requestCert: true,

};

var server = tls.createServer(options, function(socket) {
  console.log('server connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  socket.write("welcome!\n");
  socket.setEncoding('utf8');
  socket.pipe(socket);
});
server.listen(8000, function() {
  console.log('server bound');
});

// You can test this server by connecting to it with openssl s_client:

// openssl s_client -connect 127.0.0.1:8000