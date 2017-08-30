'use strict';

class Node {
  constructor(value, id){
    this.value = value
    this.id = id
    this.prev = null;
    this.next = null;
  }
};

class LinkedList {
  constructor(head, tail) {
    this.head = null;
    this.tail = null;
  }

  addToTail(value, id) {
    // console.log('value: ', value, 'id: ', id)
    let newTail = new Node(value, id);
    // console.log('new Node:', newTail)
    if (!this.head) {
      this.head = newTail;
      // console.log('new head: ', this.head)
    }
    if (this.tail) {
      newTail.prev = this.tail
      this.tail.next = newTail;
      // console.log('old tail: ', this.tail)
    }

    this.tail = newTail;
    // console.log('new tail: ', this.tail)

  }

  removeTail() {
    if (this.tail === null) return null;
    let currentTail = this.tail;
    this.tail = this.tail.prev;

    return currentTail.value;
  }

  getList() {
    let string = ''
    let node = this.head;
    while (node) {
      string = string.concat(node.value)
      node = node.next;
    }

    return string;
  }
};


let state = new LinkedList();

// Load DOM
document.addEventListener('DOMContentLoaded', initialize)