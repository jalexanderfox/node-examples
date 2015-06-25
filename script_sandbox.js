var util = require('util');
var vm = require('vm');

var sandbox = {
  animal: 'cat',
  count: 2
};

var contextifiedSandbox = vm.createContext(sandbox);

var script = new vm.Script('count += 1; name = "kitty"');

for (var i = 0; i < 10; ++i) {
  script.runInContext(contextifiedSandbox);
}

console.log(util.inspect(contextifiedSandbox));

// { animal: 'cat', count: 12, name: 'kitty' }



vm.runInNewContext('count += 1; name = "kitty"', sandbox);
console.log(util.inspect(sandbox));

// { animal: 'cat', count: 3, name: 'kitty' }


