// Inheritance is a core concept of OOP
// it enables an object to take on the props and methods of other objects
// that make it easy to reuse code in different part of app

// Classical definition of inheritance:
// e.g. Shape class has computeBestLoc method --> available to Circle and Square kids
// Shape is 'Base/Super/Parent' -- it's all the same
// Circle is 'Derived/Sub/Child' class
// Inheritance relationship is 'IS-A' relationship
// --> Circle IS A Shape

// In JS -- no classes, only Prototypical Inheritance

// Prototypical Inheritance
// parent object has all the common behavior, then we link child object to parent
// 'prototype' == parent
// child inherits all props & methods of parent

let x = {};
let y = {};
// it has __proto__ property (faded) with all inherited
// every object in JS directly or indirectly inherits from objectBase. root of all object. doesn't has parent.

// to get objects's prototype:
Object.getPrototypeOf(x) === Object.getPrototypeOf(y); // true
// __proto__ is deprecated, so don't use it in code, only in console

// prototypical inheritance in action: JS engine walks all the way up to the objectBase (root object) to look for the method or prop

// A prototype is just a regular object in memory, there is nothing special about it!
// Every object has a prototype (or parent), except for root object

let myArray = [];
// myArray --> Array --> Object (multi-level inheritance)

function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log("draw");
  };
}
const circle = new Circle(10);

// Objects created by a given constructor will have the same prototype

//
//
// Property Descriptors
let person = { name: "Masha" };
for (let key in person) {
  console.log(key); // --> just 'name'
}
// this will get own props + prototype's props
// same for
Object.keys(person); // ["name"] -- what about all those other props/methods of the objectBase?
// b/c properties have attributes attached to them --> prevent iteration ('enumerable': false)
// this gets only own properties

let objectBase = Object.getPrototypeOf(person);
let descriptor = Object.getOwnPropertyDescriptor(objectBase, "toString");
console.log(objectBase);
console.log(descriptor);
// -->
// configurable: true
// enumerable: false
// value: ƒ toString()
// writable: true
// __proto__: Object

// we can mess with these by using same method we used to set getters and setters:
Object.defineProperty(person, "name", {
  writable: false, // can't dynamically change it
  enumerable: true, // it will not show up in 'Object.keys(person)'
  configurable: false // nobody can mess with this anymore
});

person.name = "Elijah";
delete person.name; // this won't work b/c configurable is set to false
console.log(person.name); // still 'Masha'
console.log(Object.keys(person)); // depends if enumerable is set to false (true by default)

//
//
// Constructor Prototypes
// to get parent of my object:
Object.getPrototypeOf(person); // same thing as myObj.__proto__
Circle.prototype;

let obj = {}; // under the hood it's: let obj = new Object()
// so obj.__proto__ == Object.prototype

// Circle.__proto__ == Circle.prototype

//
//
// Prototype vs. Instance Members
function Square(width) {
  // Instance members
  this.width = width;
  // this.draw = function() {
  //   console.log("draw");
  // };
}
const s1 = new Square(10);
const s2 = new Square(20);
// each instance has 'draw' method --> wasted memory

// Prototype members
Square.prototype.draw = function() {
  console.log("draw");
  return this.width;
};
console.log(s1);
console.log(s2);
// now .__proto__ has 'draw' method!
console.log(s1.draw()); // still works

// to take it to new level, we can overwrite stuff!
Square.prototype.toString = function() {
  return "Square with width " + this.width;
};

s1.toString(); // "Square with width 10"

// ! so even though we have .toString on Object, our .toString is more accessible

//
//
// Exercise
function Stopwatch() {
  let duration = 0;
  let isRunning = false;
  let myTimer;

  Object.defineProperty(this, "duration", {
    get: function() {
      return duration;
    },
    set: function(value) {
      duration: value;
    }
  });

  Object.defineProperty(this, "isRunning", {
    get: function() {
      return isRunning;
    },
    set: function(value) {
      isRunning: value;
    }
  });

  Object.defineProperty(this, "myTimer", {
    get: function() {
      return myTimer;
    },
    set: function(value) {
      myTimer: value;
    }
  });
}

Stopwatch.prototype.start = function() {
  if (this.isRunning) {
    throw "Timer is already running!";
  }
  this.isRunning = true;
  console.log(this.isRunning);
  console.log("start");
  this.myTimer = window.setInterval(() => {
    this.duration++;
    console.log(this.duration);
  }, 1000);
  console.log(this.myTimer);
};

Stopwatch.prototype.stop = function() {
  if (!this.isRunning) {
    throw "Timer already stopped.";
  }
  this.isRunning = false;
  console.log("stop");
  clearInterval(this.myTimer);
};

Stopwatch.prototype.reset = function() {
  this.isRunning = false;
  console.log("reset");
  clearInterval(myTimer);
  this.duration = 0;
};

const sw = new Stopwatch();
sw.start();
