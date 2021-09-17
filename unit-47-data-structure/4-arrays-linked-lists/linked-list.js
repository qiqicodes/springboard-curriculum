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

    if (this.head !== null) newNode.next = this.head;
    this.head = newNode;

    if (this.length === 0) this.tail = this.head;

    this.length++;
  }

  // /** pop(): return & remove last item. */
  // Todo: throw error if list is empty

  pop() {
    return this.removeAt(this.length - 1);
  }

  // /** shift(): return & remove first item. */
  // Todo: throw error if list is empty

  shift() {
    return this.removeAt(0);
  }

  // /** getAt(idx): get val at idx. */
  // done: throw error if index is invalid

  getAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("Index is invalid");

    let current = this.head;

    for (let i = 0; i < idx; i++) current = current.next;

    return current.val;
  }

  // /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) throw new Error("Index is invalid");

    let current = this.head;

    for (let i = 0; i < idx; i++) current = current.next;

    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) throw new Error("Index is invalid");

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let prev = this.head;
    let count = 0;

    while (prev !== null && count !== idx - 1) {
      prev = prev.next;
      count++;
    }

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("Index is invalid");

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length--;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this.head;
    let count = 0;

    while (prev !== null && count !== idx - 1) {
      prev = prev.next;
      count++;
    }

    if (idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length--;
      return val;
    }

    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length--;

    return val;
  }

  // /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let sum = 0;
    let current = this.head;

    while (current !== null) {
      sum += current.val;
      current = current.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
