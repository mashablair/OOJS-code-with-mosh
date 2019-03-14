// 2 ways to create an object:

// 1.
// Factory Function
function createCircle(radius) {
  return {
    radius,
    draw: function() {
      console.log("draw");
    }
  };
}
// here we just return an object inside the function

const circle = createCircle(2);
circle.draw();

// 2.
// Constructors
function Circle(radius) {
  // 'this' is a reference to the object that is executing this piece of code
  console.log("this", this);
  // output is Circle object
  // if we forget 'new' operator, 'this' will be Window (in strict mode 'undefined')

  this.radius = radius;
  this.draw = function() {
    console.log("draw");
  };
}

const another = new Circle(3);

// when we use 'new' operator, under the hood it:
// 1) creates a new empty object (e.g. {})
// 2) and it will set 'this' to point to that object (instead of Window object)
// 3) it will return this object from this function (notice, there is no 'return' statement)

// this code is same as this:
Circle.call({}, 1); // here 1st arg creates an empty object to point 'this' to
// similar:
Circle.apply({}, [1]); // this is useful if you already have an array of arguments

// They are both regular functions (factory vs. constructor wars) -- it really doesn't matter which one you use
// Constructor looks like an instance of a class, but there are no classes in JS

// Constructor
// to look at the constructor:
console.log(another.constructor); // Circle object
console.log(Circle.constructor); // Function() {...}
console.log(circle.constructor); // Object() {...} -- built-in constructor function in JS

// when we create an object literal, here is what JS engine will translate it into:
let x = {};
// let x = new Object();

var masha = new String("masha"); // this will work
console.log(masha); // String {"masha"}

// ! Every object has a constructor property and that references the function that was used to create that object
console.log(masha.constructor); // ƒ String() { [native code] }

// functions are objects
// If you type Circle. , it will show you the list of properties and methods available to objects

// Values vs Reference Types
let y = 10;
let z = y;

y = 20;
// z is still 10
// that's because y and z are 2 independent variables (when it comes to primities)
// values are COPIED

let a = { value: 10 };
let b = a;
a.value = 50;
// both point to the same object in memory {value: 10}
// variable a and b store an ADDRESS to that value somewhere in memory

// Primities are copied by their value.
// Objects are copied by their reference.

let number = 10;
function increase(number) {
  number++;
  console.log(number); // 11
}
increase(number);
console.log(number); // still 10!!!!

// when we call this function, let number's value is copied to the argument, so it's independent
// so after function is done, number goes out of scope

// let's change it to an object:
let obj = { value: 10 };
function increaseObj(obj) {
  obj.value++;
}
increaseObj(obj);
console.log(obj); // it's {value:11} !!!

// Adding/Removing Properties
circle.color = "blue";
console.log(circle); // {radius: 2, draw: ƒ, color: "blue"}
// another way is bracket notation:
circle["shape"] = "circle!";
console.log(circle);

// this is useful in certain scenarios (e.g. when you want to dynamically access a particular property):
const propertyName = "color";
console.log(circle[propertyName]);

// or when using invalid identifier
circle["center-location"] = 5;
console.log(circle); // {radius: 2, draw: ƒ, color: "blue", shape: "circle!", center-location: 5}

circle["center location"] = 5;
console.log(circle); // {..., center-location: 5, center location: 5}

// real-world use case: when you return user info to client, but don't want to include passwords, CC info etc.
// --> delete operator
delete circle.color;
console.log(circle);

// Enumerating Properties
// to iterate over properties -- use 'for in' loop
for (let key in circle) {
  console.log(key, circle[key]);
}

// you can even restrict what you want:
for (let key in circle) {
  if (typeof circle[key] !== "function") {
    console.log(key, circle[key]); // only properties, no methods
  }
}

// another approachc
const keys = Object.keys(circle);
console.log(keys); // --> array:   ["radius", "draw", "shape", "center-location", "center location"]
// or
console.log(Object.keys(circle)); // same as ^
// but here you can't eliminate certain properties like above

// if you want to know if object has some property -- use 'in' operator
if ("radius" in circle) {
  console.log("Circle has a radius!");
}
// or
console.log("radius" in circle); // true
