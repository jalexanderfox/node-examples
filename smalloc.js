var smalloc = require('smalloc');

var doubleArr = smalloc.alloc(3, smalloc.Types.Double);

for (var i = 0; i < 3; i++)
  doubleArr = i / 10;

// { '0': 0, '1': 0.1, '2': 0.2 }