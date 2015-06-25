var cluster = require('cluster');
if (cluster.isMaster) {
  var worker = cluster.fork();
  var timeout;

  worker.on('listening', function(address) {
    worker.send('shutdown');
    worker.disconnect();
    timeout = setTimeout(function() {
      worker.kill();
    }, 2000);
  });

  worker.on('disconnect', function() {
    clearTimeout(timeout);
  });

} else if (cluster.isWorker) {
  var net = require('net');
  var server = net.createServer(function(socket) {
    // connections never end
  });

  server.listen(8000);

  process.on('message', function(msg) {
    if(msg === 'shutdown') {
      // initiate graceful close of any connections to server
    }
  });
}