'use strict';

// state management
let state = {}
let dice = ['aaafrs','aaeeee','aafirs','adennn','aeeeem','aeegmu','aegmnn','afirsy','bjkqxz','ccenst','ceiilt','ceilpt','ceipst','ddhnot','dhhlor','dhlnor','dhlnor','eiiitt','emottt','ensssu','fiprsy','gorrvw','iprrry','nootuw', 'ooottu'];

const getDice = () => {
  const random = (set) => Math.floor(Math.random() * set.length);
  const randomDie = () => dice.splice(random(dice), 1)[0];
  const randomSide = (die) => die[random(die)];

  return [...Array(25)].reduce( (board) => {
    return board.concat( randomSide( randomDie() ))
  }, [])
}

const loadDice = () => {
  let gameboard = document.getElementById('gameboard')
  let count = 1
  getDice().forEach( letter => {

    let el = document.createElement('div')
    el.classList.add('Grid-cell')
    el.innerHTML = letter === 'q' ? 'Qu' : letter.toUpperCase()
    el.id = count++
    // TODO: add click event listener
    gameboard.appendChild(el)

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
