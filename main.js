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
    let newTail = new Node(value, id);
    if (!this.head) {
      this.head = newTail;
    }
    if (this.tail) {
      newTail.prev = this.tail
      this.tail.next = newTail;
    }

    this.tail = newTail;
  }

  removeTail() {
    if (this.tail === null) return null;
    let currentTail = this.tail;
    this.tail = this.tail.prev;
  }

  removeHead() {
    if (this.head === null) return null;
    let currentHead = this.head;
    this.head = null;
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