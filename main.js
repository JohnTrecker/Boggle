'use strict';

// state management
let state = {}
let dice = ['aaafrs','aaeeee','aafirs','adennn','aeeeem','aeegmu','aegmnn','afirsy','bjkqxz','ccenst','ceiilt','ceilpt','ceipst','ddhnot','dhhlor','dhlnor','dhlnor','eiiitt','emottt','ensssu','fiprsy','gorrvw','iprrry','nootuw'];

const getDice = () => {
  let board = []
  let i = 5; while (i--) {
    let index = Math.floor(Math.random() * dice.length);
    let die = dice.slice(index, index + 1)[0]
    board.push(die)
  }
  return board
}

const loadDice = () => {
  let gameboard = document.getElementById('gameboard')
  let count = 1
  getDice().forEach( (die) => {
    die.split('').forEach( letter => {

      let el = document.createElement('div')
      el.classList.add('Grid-cell')
      el.innerHTML = letter === 'q' ? 'Qu' : letter.toUpperCase()
      el.id = count++
      // TODO: add click event listener
      gameboard.appendChild(el)

    })
  })
}

document.addEventListener('DOMContentLoaded', loadDice)

// el.addEventListener('click', state.current.handleClick, false)

// class Word {
//   constructor() {
//     this.value = '';
//     this.head = null;
//     this.tail = null;
//   }
//   handleClick(e) {
//     console.log('button pressed: ', e.target)
//   }
// }

// let currentWord = document.getElementById('curent-val')
// document.o
