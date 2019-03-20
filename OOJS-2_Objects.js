// ABSTRACTION
function Circle(radius) {
  let defaultLocation = { x: 0, y: 0 };
  let computeBestLocation = function(valX, valY) {
    defaultLocation.x = valX;
    defaultLocation.y = valY;
    console.log(defaultLocation);
  };

  this.radius = radius;
  this.draw = function() {
    const valX = 5;
    const valY = 10;
    computeBestLocation(valX, valY);
  };
}

var circle = new Circle(5);
circle.draw();

// some properties or methods shouldn't be available to public or they will mess up the object

// in OOP, abstration is: hide the details, show the essentials
// like a DVD player
// some stuff shouldn't be accessible form outside
// so instead of setting some properties/methods, defined them as local vars.

// with scope, these vars will die as soon as the function ends running
// but with CLOSURE they are still available when we call circle.draw()!

// in constrast to scope, closure determines which vars will be available to inner function (both local AND in outer function/object)

// scope is temporary and it dies
// closure stays there in memory

// so those local variables are private members of the object

// GETTERS AND SETTERS
function Square(width) {
  // public member
  this.width = width;

  // private member
  let defaultCoords = { x: 0, y: 0 };
  let defaultLocation = { x: 0, y: 0 };

  this.draw = function() {
    console.log("draw");
  };

  // one way to do it:
  // this.getDefaultCoords = function() {
  //   return defaultCoords;
  // };

  // but this is better -- use getter:
  Object.defineProperty(this, "defaultCoords", {
    get: function() {
      return defaultCoords;
    },

    // to set a value (and optionally add a validation)
    set: function(value) {
      if (!value.x || !value.y) {
        // this validation didn't work...
        throw new Error("Invalid location");
      }
      defaultLocation = value;
    }
  });
}

const square = new Square(5);
square.draw();
console.log(square.defaultCoords); // {x: 0, y: 0}

// what if we want to just access the defaultCoords, and not modify it? Only able to read it?
// defaultCoords is now a 'computed property' and is available on square object (value is ... -- click on it and see the value)
// it's read-only property

// so use  Object.defineProperty to define getters and setters
console.log((square.defaultLocation = 1)); // --> should be an error...

// Exercise
function Stopwatch() {
  let duration = 0;
  let isRunning = false;
  let myTimer;

  this.start = function() {
    if (isRunning) {
      throw "Timer is already running!";
    }
    isRunning = true;
    console.log("start");
    myTimer = window.setInterval(function() {
      duration++;
    }, 1000);
  };

  this.stop = function() {
    if (!isRunning) {
      throw "Timer already stopped.";
    }
    isRunning = false;
    console.log("stop");
    clearInterval(myTimer);
  };

  this.reset = function() {
    isRunning = false;
    console.log("reset");
    clearInterval(myTimer);
    duration = 0;
  };

  Object.defineProperty(this, "duration", {
    get: function() {
      return duration;
    }
  });
}

const sw = new Stopwatch();
// sw.start();
