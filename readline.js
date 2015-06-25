var readline = require('readline');

function completer(line) {
  var completions = '.help .error .exit .quit .q'.split(' ')
  var hits = completions.filter(function(c) { return c.indexOf(line) == 0 })
  // show all completions if none found
  return [hits.length ? hits : completions, line]
}

var getReadlineInterface = function() { return readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		completer: completer
	})
};

var rl = getReadlineInterface();

rl.on('pause', function() {
  console.log('Readline paused.');
});

rl.on('resume', function() {
  console.log('Readline resumed.');
});

rl.on('SIGINT', function() {
  rl.question('Are you sure you want to exit?', function(answer) {
    if (answer.match(/^y(es)?$/i)) rl.pause();
  });
});

rl.on('SIGTSTP', function() {
  // This will override SIGTSTP and prevent the program from going to the
  // background.
  console.log('Caught SIGTSTP.');
});

rl.on('SIGCONT', function() {
  // `prompt` will automatically resume the stream
  rl.prompt();
});

rl.write('Delete me!');
// Simulate ctrl+u to delete the line written previously
setTimeout(
	function(){
		rl.write(null, {ctrl: true, name: 'u'});
	}
	, 2000
);

rl.question("What do you think of node.js? ", function(answer) {
  // TODO: Log the answer in a database
  console.log("Thank you for your valuable feedback:", answer);
	rl.question("What do you think of node.js readline + interface? ", function(answer) {
	  // TODO: Log the answer in a database
	  console.log("Thank you for your valuable feedback:", answer);
	  rl.close();
	});
});


