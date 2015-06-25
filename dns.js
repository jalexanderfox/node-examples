var dns = require('dns');

dns.lookup('www.google.com', function onLookup(err, addresses, family) {
  console.log('addresses:', addresses);
});



// Here is an example which resolves 'www.google.com' then reverse resolves the IP addresses which are returned.
dns.resolve4('www.google.com', function (err, addresses) {
  if (err) throw err;

  console.log('addresses: ' + JSON.stringify(addresses));

  addresses.forEach(function (a) {
    dns.reverse(a, function (err, hostnames) {
      if (err) {
        throw err;
      }

      console.log('reverse for ' + a + ': ' + JSON.stringify(hostnames));
    });
  });
});