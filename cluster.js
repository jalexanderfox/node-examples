// The cluster module allows you to easily create child processes that all share server ports.

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}

// The difference between 'fork' and 'online' is that fork is emitted when the
// master forks a worker, and 'online' is emitted when the worker is running.
cluster.on('online', function(worker) {
  console.log("Yay, the worker responded after it was forked");
});


// When a new worker is forked the cluster module will emit a 'fork' event.
// This can be used to log worker activity, and create your own timeout.

var timeouts = [];
function errorMsg() {
  console.error("Something must be wrong with the connection ...");
}

cluster.on('fork', function(worker) {
  timeouts[worker.id] = setTimeout(errorMsg, 2000);
});

cluster.on('listening', function(worker, address) {
  clearTimeout(timeouts[worker.id]);
  console.log("A worker is now connected to " + address.address + ":" + address.port);
});

cluster.on('exit', function(worker, code, signal) {
  clearTimeout(timeouts[worker.id]);
  errorMsg();
});

cluster.on('disconnect', function(worker) {
  console.log('The worker #' + worker.id + ' has disconnected');
});

// When any of the workers die the cluster module will emit the 'exit' event.
// This can be used to restart the worker by calling .fork() again.
cluster.on('exit', function(worker, code, signal) {
  if (worker.suicide === true) { // Set by calling .kill() or .disconnect(), until then it is undefined.
    console.log('Oh, it was just suicide\' – no need to worry').
  } else {
  	console.log('worker %d died (%s). restarting...',
    	worker.process.pid, signal || code);
  	cluster.fork();
  }

});

cluster.on('exit', function(worker, code, signal) {

});


// NODE_DEBUG=cluster node cluster.js