var cluster = require('cluster');

if (cluster.isMaster) {
  console.log('I am master');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log('I am worker #' + cluster.worker.id);
}

// Go through all workers
function eachWorker(callback) {
  for (var id in cluster.workers) {
    callback(cluster.workers[id]);
  }
}
eachWorker(function(worker) {
	bigAnnouncment = 'big announcement to all workers';
	console.log(bigAnnouncment);
  worker.send(bigAnnouncment);
});

// NODE_DEBUG=cluster node cluster.worker.js