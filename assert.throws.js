var assert = require('assert');

// Validate instanceof using constructor:

assert.throws(
  function() {
    throw new Error("Wrong value");
  },
  Error
);


// Validate error message using RegExp:

assert.throws(
  function() {
    throw new Error("Wrong value");
  },
  /value/
);


// Custom error validation:

assert.throws(
  function() {
    throw new Error("Wrong value");
  },
  function(err) {
    if ( (err instanceof Error) && /value/.test(err) ) {
      return true;
    }
  },
  "unexpected error"
);