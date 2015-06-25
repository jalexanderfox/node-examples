// Compressing or decompressing a file can be done by piping an fs.ReadStream into a zlib stream, then into an fs.WriteStream.

var zlib = require('zlib');
var gzip = zlib.createGzip();
var fs = require('fs');
var inp = fs.createReadStream('zlib_input.txt');
var out = fs.createWriteStream('zlib_input.txt.gz');

inp.pipe(gzip).pipe(out);


// Compressing or decompressing data in one step can be done by using the convenience methods.

var input = '.................................';
zlib.deflate(input, function(err, buffer) {
  if (!err) {
    console.log(buffer.toString('base64'));
  }
});

var buffer = new Buffer('eJzT0yMAAGTvBe8=', 'base64');
zlib.unzip(buffer, function(err, buffer) {
  if (!err) {
    console.log(buffer.toString());
  }
});