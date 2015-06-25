// The REPL provides access to any variables in the global scope. You can expose a variable to the REPL explicitly by assigning it to the context object associated with each REPLServer. For example:

// repl_test.js
var repl = require("repl"),
    msg = "message";

repl.start("> ").context.m = msg;
// Things in the context object appear as local within the REPL:

// mjr:~$ node repl_test.js
// > m
// 'message'