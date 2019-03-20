class Stack {
  constructor() {
    this.array = [];
    this.count = this.array.length;
  }

  showStackInfo() {
    console.log(this.array);
    console.log(`The count is ${this.count}`);
  }

  push(item) {
    this.array.push(item);
    this.count++;
    this.showStackInfo();
  }

  pop() {
    if (this.count === 0) {
      throw "The stack is already empty";
    }
    this.array.pop();
    this.count--;
    this.showStackInfo();
  }

  peek() {
    if (this.count === 0) {
      throw "No item in the stack";
    }
    let lastItem = this.array[this.count - 1];
    console.log(lastItem);
  }
}

const stack = new Stack("Masha");
stack.showStackInfo();
