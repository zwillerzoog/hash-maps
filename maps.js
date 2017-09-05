'use strict';

console.log('well hello there');

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    //How to ask for key and if it is equal to new pushed key
    // for
    // if (this.key[i] === this.key[j]) {

    // }

    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

let map = new HashMap();
// console.log(map._resize(9));

console.log(HashMap._hashString('a'));
// map.set('a', 'alfred');
// map.set('a', 'ant');
// map.set(13, 'joey');
// map.set(14, 'oscar');
// map.set(15, 'penelope');
// map.set(16, 'jasminda');
// map.set(17, 'henry');
// map.set(16, 'jasminda');
// map.set(18, 'henrietta');

let names = [
  { Hobbit: 'Bilbo' },
  { Hobbit: 'Frodo' },
  { Wizard: 'Gandalf' },
  { Human: 'Aragorn' },
  { Elf: 'Legolas' },
  { Maiar: 'The Necromancer' },
  { Maiar: 'Sauron' },
  { RingBearer: 'Gollum' },
  { LadyOfLight: 'Galadriel' },
  { HalfElven: 'Arwen' },
  { ShepherdOfTheTrees: 'Treebeard' }
];

function getKeys() {
  let key;
  for (let i = 0; i < names.length; i++) {
    for (let j = 0; j < names.length; j++) {
      for (key in names[i]) {
        for (let currentKey in names[j]) {

          if (key === currentKey && names[i][key] !== names[j][currentKey]) {
            let newNode = names[i];
            newNode.next = names[j];
            map.set(key, newNode);
            i++;
         
          }

          else if (key !== 'Hobbit' && key !== 'Maiar') {
            // if (key !== 'Hobbit' && key !== 'Maiar') {
            map.set(key, names[i][key]);
          }
        }
      }
    }
  }
}

getKeys();

console.log(map);

// 0: [ark, ant,]
// 1
// 2
// {[a, b]: [alfred, ant]}

//Write a hash map implementation which uses separate chaining.

// If(node.key == key){ return node}
