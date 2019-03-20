const _array = new WeakMap();

class Stack {
  constructor(array) {
    _array.set(this, []);
  }

  showStackInfo() {
    const items = _array.get(this);
    console.log(items);
    console.log(`The count is ${items.length}`);
  }

  push(item) {
    _array.get(this).push(item);
    // this.count++;
    this.showStackInfo();
  }

  pop() {
    const items = _array.get(this);
    if (items.length === 0) throw "The stack is already empty";
    return items.pop();
  }

  peek() {
    const items = _array.get(this);
    if (items.length === 0) throw "No item in the stack";
    return items[items.length - 1];
  }

  get count() {
    return _array.get(this).length;
  }
  // to call it: stack.count (as a property, not method)
}

const stack = new Stack();
stack.showStackInfo();

//
//
//
// Another exercise
const _width = new WeakMap();
class Rectangle {
  constructor(width) {
    _width.set(this, width);
  }

  draw() {
    console.log("Rectangle with width" + _width.get(this));
  }

  get width() {
    return _width.get(this);
  }

  // although I don't undestand why do it this way
  // since this makes 'width' a public prop that can be reset from outside now
  set width(value) {
    if (value <= 0) throw "Invalid width value";
    _width.set(this, value);
  }
}

const r = new Rectangle(4);
