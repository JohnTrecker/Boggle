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

const isAdjacent = (element, tail) => {
  const test = [-6,-5,-4,-1,1,4,5,6] // 8 possible adjacent positions based on 25 sequential dice values
  return test.some((num) => (num + element) === tail ? true : false)
}

const createElement = (string, id) => {
  let gameboard = document.getElementById('gameboard')
  let currentWord = document.getElementById('current-val').innerHTML
  let el = document.createElement('div')

  el.classList.add('grid-cell')
  el.innerHTML = string === 'q' ? 'Qu' : string.toUpperCase()
  el.id = ++id

  el.addEventListener('click', () => {
    if (el.classList.contains('active')) el.classList.remove('active')
    else el.classList.add('active')

    if (!state.tail) state.addToTail( el.innerHTML, el.id )
    // if (el.id === state.tail.id) state.removeTail()
    else if ( isAdjacent(el.id, state.tail.id) ) {
      state.addToTail( el.innerHTML, el.id )
    }

    let word = state.getList()
    console.log(word)
    document.getElementById('current-val').innerHTML = word;
  })

  gameboard.appendChild(el)
}

const initialize = () => {
  loadDice()
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