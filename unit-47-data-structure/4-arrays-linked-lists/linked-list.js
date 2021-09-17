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

  // pop() {
  //   let popItem = this.tail.val;

  //   // Todo: traverse list from head to one before tail.
  //   this.length--;

  //   return popItem;
  // }

  // /** shift(): return & remove first item. */
  // Todo: throw error if list is empty

  // shift() {
  //   let shiftItem = this.head.val;

  //   this.head = this.head.next;

  //   this.length--;

  //   return shiftItem;
  // }

  // /** getAt(idx): get val at idx. */
  // done: throw error if index is invalid

  getAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("Index is invalid");

    let current = this.head;

    for (let i = 0; i < idx; i++) current = current.next;

    return current.val;
  }

  // /** setAt(idx, val): set val at idx to val */
  // done: throw error if index is invalid

  // setAt(idx, val) {

  // }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx >= this.length) throw new Error("Index is invalid");

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let current = this.head;
    let count = 0;

    while (current !== null && count !== idx - 1) {
      current = current.next;
      count++;
    }

    let newNode = new Node(val);
    newNode.next = current.next;
    current.next = newNode;

    // for (let i = 0; i < idx; i++) current = current.next;

    // newNode.next = current.next;
    // current.val = newNode;

    this.length++;
  }

  // /** removeAt(idx): return & remove item at idx, */

  // removeAt(idx) {}

  // /** average(): return an average of all values in the list */

  // average() {}
}

module.exports = LinkedList;
