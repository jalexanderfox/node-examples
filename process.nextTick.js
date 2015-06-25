function MyThing(options) {
	this.setupOptions = function() {return options; };
  this.setupOptions(options);
  this.stuffStarted=false;

  this.startDoingStuff = function() { this.stuffStarted = true; };
  process.nextTick(function() {
    this.startDoingStuff();
  }.bind(this));

  this.getReadyForStuff = function() { return this.stuffStarted === true; };
}

var thing = new MyThing();
console.log(thing.getReadyForStuff());


// thing.startDoingStuff() gets called now, not before.