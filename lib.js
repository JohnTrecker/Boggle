'use strict';

const getDice = () => {
  const random = (set) => Math.floor(Math.random() * set.length);
  const randomDie = () => dice.splice(random(dice), 1)[0];
  const randomSide = (die) => die[random(die)];

  return [...Array(25)].reduce( (board) => {
    return board.concat( randomSide( randomDie() ))
  }, [])
}

const loadDice = () => {
  getDice().forEach( (letter, id) => {
    createElement(letter, id)
  })
}

const initialize = () => {
  loadDice()
}

const isAdjacent = (element, tail) => {
  element = parseInt(element,10)
  tail = parseInt(tail,10)

  const test = [-6,-5,-4,-1,1,4,5,6] // 8 possible adjacent positions based on 25 sequential dice values
  return test.some((num) => {
    let sum = num + element
    return sum === tail ? true : false
  })
}

let createElement = (string, id) => {
  let gameboard = document.getElementById('gameboard')
  let el = document.createElement('div')
  const activate = () => el.classList.add('active')
  const deactivate = () => el.classList.remove('active')

  el.classList.add('grid-cell')
  el.innerHTML = string === 'q' ? 'Qu' : string.toUpperCase()
  el.id = ++id

  el.addEventListener('click', () => {

    if (!state.tail || isAdjacent(el.id, state.tail.id)) {
      state.addToTail( el.innerHTML, el.id )
      activate()
    } else if (el.id === state.tail.id) {
      state.removeTail()
      if (!state.tail) state.removeHead()
      deactivate()
    }

    let word = state.getList()
    document.getElementById('current-val').innerHTML = word
  }, false)

  gameboard.appendChild(el)
}

// class Word {
//   constructor() {
//     this.value = 'empty';
//     this.head = null;
//     this.tail = null;
//   }
//   handleClick(e) {
//     let cell = e.target
//     state.value = cell.innerHTML
//     cell.classList.add('active')
//     document.getElementById('current-val').innerHTML = state.getList()
//   }
// }