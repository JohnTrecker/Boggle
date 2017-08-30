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
    createDieElement(letter, id)
  })
}

const initialize = () => {
  loadDice()
  document.getElementById('submit').addEventListener('click', submitWord)
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

const activate = (el) => el.classList.add('active')

const deactivate = (el) => el.classList.remove('active')

const createDieElement = (string, id) => {
  let gameboard = document.getElementById('gameboard')
  let el = document.createElement('div')

  el.classList.add('grid-cell')
  el.innerHTML = string === 'q' ? 'Qu' : string.toUpperCase()
  el.id = ++id

  el.addEventListener('click', () => {

    if (!state.tail || isAdjacent(el.id, state.tail.id)) {
      state.addToTail( el.innerHTML, el.id )
      activate(el)
    } else if (el.id === state.tail.id) {
      state.removeTail()
      if (!state.tail) state.removeHead()
      deactivate(el)
    }

    let word = state.getList()
    document.getElementById('current-val').innerHTML = word
  }, false)

  gameboard.appendChild(el)
}

const getScore = (word) => {
  if (typeof word !== 'string') return
  const l = word.length
  if (l < 3) return 0
  else if (l === 3 || l === 4) return 1
  else if (l === 5) return 2
  else if (l === 6) return 3
  else if (l === 7) return 5
  else if (l > 7) return 11
}

const getTotalScore = () => {
  let sum = 0
  document.querySelectorAll('.score').forEach( el => {
    sum += parseInt(el.innerHTML)
  })
  return sum
}

const createTable = (word) => {
  let tr = document.createElement('tr')
  let tdWord = document.createElement('th')
  let tdScore = document.createElement('th')
  let score = getScore(word)

  tdWord.innerHTML = word
  tdScore.innerHTML = score
  tdScore.classList.add('score')

  tr.append(tdWord)
  tr.append(tdScore)
  tr.classList.add('history')

  return score > 0 ? tr : undefined
}

const insertWord = () => {
  const parent = document.getElementById('scoreboard-parent')
  const tr1 = createTable(state.getList())
  const tr2 = parent.firstElementChild.nextSibling
  if (tr1) parent.insertBefore(tr1, tr2)
}

const updateTotal = () => {
  document.getElementById('total-val').innerHTML = getTotalScore()
}

const submitWord = () => {
  document.querySelectorAll('.active').forEach( el => deactivate(el) )
  document.getElementById('current-val').innerHTML = ''
  insertWord()
  updateTotal()
  state.removeHead()
}