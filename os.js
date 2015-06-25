var os = require('os');

// this only works because os methods are all getters... this could break is parameters were required for the methods.
for( var method in os){
	if ( os.hasOwnProperty(method) && typeof(os[method]) === 'function') {
		console.log('os.' + method + ' =', os[method]());
	}
}