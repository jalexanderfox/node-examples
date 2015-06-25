str = '\u00bd + \u00bc = \u00be';

console.log(str + ": " + str.length + " characters, " +
  Buffer.byteLength(str, 'utf8') + " bytes");

// ½ + ¼ = ¾: 9 characters, 12 bytes


//Example: copy an ASCII string into a buffer, one byte at a time:
str = "node.js";
buf = new Buffer(str.length);

for (var i = 0; i < str.length ; i++) {
  buf[i] = str.charCodeAt(i);
}

console.log(buf);

// node.js



// Example: Buffer.copy
buf1 = new Buffer(26);
buf2 = new Buffer(26);

for (var i = 0 ; i < 26 ; i++) {
  buf1[i] = i + 97; // 97 is ASCII a
  buf2[i] = 33; // ASCII !
}

buf1.copy(buf2, 8, 16, 20);
console.log(buf2.toString('ascii', 0, 25));

// !!!!!!!!qrst!!!!!!!!!!!!!



//Example: Build a single buffer, then copy data from one region to an overlapping region in the same buffer

buf = new Buffer(26);

for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97; // 97 is ASCII a
}

buf.copy(buf, 0, 4, 10);
console.log(buf.toString());

// efghijghijklmnopqrstuvwxyz




//Buffer.slice()
//Example: build a Buffer with the ASCII alphabet, take a slice, then modify one byte from the original Buffer.

var buf1 = new Buffer(26);

for (var i = 0 ; i < 26 ; i++) {
  buf1[i] = i + 97; // 97 is ASCII a
}

var buf2 = buf1.slice(0, 3);
console.log(buf2.toString('ascii', 0, buf2.length));
buf1[0] = 33;
console.log(buf2.toString('ascii', 0, buf2.length));

// abc
// !bc



//buf.readUInt8(offset[, noAssert])#
// offset Number
// noAssert Boolean, Optional, Default: false
// Return: Number
// Reads an unsigned 8 bit integer from the buffer at the specified offset.

// Set noAssert to true to skip validation of offset. This means that offset may be beyond the end of the buffer. Defaults to false.

// Example:
var buf = new Buffer(4);

buf[0] = 0x3;
buf[1] = 0x4;
buf[2] = 0x23;
buf[3] = 0x42;

for (ii = 0; ii < buf.length; ii++) {
  console.log(buf.readUInt8(ii));
}

// 0x3
// 0x4
// 0x23
// 0x42


//buf.readUInt16BE(offset[, noAssert])#
// offset Number
// noAssert Boolean, Optional, Default: false
// Return: Number
// Reads an unsigned 16 bit integer from the buffer at the specified offset with specified endian format.

// Set noAssert to true to skip validation of offset. This means that offset may be beyond the end of the buffer. Defaults to false.

// Example:
var buf = new Buffer(4);

buf[0] = 0x3;
buf[1] = 0x4;
buf[2] = 0x23;
buf[3] = 0x42;

console.log(buf.readUInt16BE(0));
console.log(buf.readUInt16LE(0));
console.log(buf.readUInt16BE(1));
console.log(buf.readUInt16LE(1));
console.log(buf.readUInt16BE(2));
console.log(buf.readUInt16LE(2));

// 0x0304
// 0x0403
// 0x0423
// 0x2304
// 0x2342
// 0x4223




//buf.readFloatBE(offset[, noAssert])#
// offset Number
// noAssert Boolean, Optional, Default: false
// Return: Number
// Reads a 32 bit float from the buffer at the specified offset with specified endian format.

// Set noAssert to true to skip validation of offset. This means that offset may be beyond the end of the buffer. Defaults to false.

// Example:
var buf = new Buffer(4);

buf[0] = 0x00;
buf[1] = 0x00;
buf[2] = 0x80;
buf[3] = 0x3f;

console.log(buf.readFloatLE(0));

// 0x01




// buf.readDoubleLE(offset[, noAssert])#
// buf.readDoubleBE(offset[, noAssert])#
// offset Number
// noAssert Boolean, Optional, Default: false
// Return: Number
// Reads a 64 bit double from the buffer at the specified offset with specified endian format.

// Set noAssert to true to skip validation of offset. This means that offset may be beyond the end of the buffer. Defaults to false.

// Example:
var buf = new Buffer(8);

buf[0] = 0x55;
buf[1] = 0x55;
buf[2] = 0x55;
buf[3] = 0x55;
buf[4] = 0x55;
buf[5] = 0x55;
buf[6] = 0xd5;
buf[7] = 0x3f;

console.log(buf.readDoubleLE(0));

// 0.3333333333333333



// buf.writeUInt8(value, offset[, noAssert])#
// value Number
// offset Number
// noAssert Boolean, Optional, Default: false
// Writes value to the buffer at the specified offset. Note, value must be a valid unsigned 8 bit integer.

// Set noAssert to true to skip validation of value and offset. This means that value may be too large for the specific function and offset may be beyond the end of the buffer leading to the values being silently dropped. This should not be used unless you are certain of correctness. Defaults to false.

// Example:
var buf = new Buffer(4);
buf.writeUInt8(0x3, 0);
buf.writeUInt8(0x4, 1);
buf.writeUInt8(0x23, 2);
buf.writeUInt8(0x42, 3);

console.log(buf);

// <Buffer 03 04 23 42>



// buf.writeUInt16BE(value, offset[, noAssert])#
// value Number
// offset Number
// noAssert Boolean, Optional, Default: false
// Writes value to the buffer at the specified offset with specified endian format. Note, value must be a valid unsigned 16 bit integer.

// Set noAssert to true to skip validation of value and offset. This means that value may be too large for the specific function and offset may be beyond the end of the buffer leading to the values being silently dropped. This should not be used unless you are certain of correctness. Defaults to false.

// Example:
var buf = new Buffer(4);
buf.writeUInt16BE(0xdead, 0);
buf.writeUInt16BE(0xbeef, 2);

console.log(buf);

buf.writeUInt16LE(0xdead, 0);
buf.writeUInt16LE(0xbeef, 2);

console.log(buf);

// <Buffer de ad be ef>
// <Buffer ad de ef be>