var fs = require('fs');
var util = require('util');

fs.appendFile('message.txt', 'data to append', function (err) {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});


fs.exists('/etc/passwd', function (exists) {
  util.debug(exists ? "it's there" : "no passwd!");
});

//node --debug fs.js

// fs.access('/etc/passwd', fs.R_OK | fs.W_OK, function(err) {
//   util.debug(err ? 'no access!' : 'can read/write');
// });