/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.head) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = this.head;
    }

    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    newNode.next = this.head;
    this.head = newNode;

    this.length++;
  }

  // /** pop(): return & remove last item. */

  pop() {
    let popItem = this.tail.val;

    // Todo: traverse list from head to one before tail.
    this.length--;

    return popItem;
  }

  // /** shift(): return & remove first item. */

  shift() {
    let shiftItem = this.head.val;

    this.head = this.head.next;

    this.length--;

    return shiftItem;
  }

  // /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0 || idx >= this.length) return null;

    let current = this.head;

    for (let i = 0; i < idx; i++) current = current.next;

    return current.val;
  }

  // /** setAt(idx, val): set val at idx to val */

  // setAt(idx, val) {}

  // /** insertAt(idx, val): add node w/val before idx. */

  // insertAt(idx, val) {}

  // /** removeAt(idx): return & remove item at idx, */

  // removeAt(idx) {}

  // /** average(): return an average of all values in the list */

  // average() {}
}

module.exports = LinkedList;
