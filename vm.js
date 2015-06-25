// Example: compile and execute different scripts in a single existing context.

var util = require('util');
var vm = require('vm');

var sandbox = { globalVar: 1 };
contextifiedSandbox = vm.createContext(sandbox);

for (var i = 0; i < 10; ++i) {
    vm.runInContext('globalVar *= 2;', contextifiedSandbox);
}
console.log(util.inspect(contextifiedSandbox));

// { globalVar: 1024 }



var sandboxCats = {
  animal: 'cat',
  count: 2
};

vm.runInNewContext('count += 1; name = "kitty"', sandboxCats);
console.log(util.inspect(sandboxCats));

// { animal: 'cat', count: 3, name: 'kitty' }