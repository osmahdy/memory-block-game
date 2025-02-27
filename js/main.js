let windowEl = document.querySelector(`.window`);
let congrates = document.querySelector(`.window .congrates`);
let select = document.querySelector(`.window select`);
let startBtn = document.querySelector(`.window button`);
let gameEl = document.querySelector(`.game`);
let time = document.querySelector(`.game .top .timer `);
let mistakes = document.querySelector(`.game .top .mistakes `);
let cardsEl = document.querySelector(`.game .cards`);
let cards = document.querySelector(`.game .cards .card`);
let level = '';
let numOfBlocks = 0;
let wrong = 1;
let successFinish = false;
congrates.textContent = 'Discover The Power Of Your Brain';
mistakes.textContent = 'Number Of Mistakes: 0';
let mainTime;
let tcountTime;

window.onload = () => {
  windowEl.style.animation = 'scalingOut 0.4s linear forwards';
  gameEl.style.pointerEvents = 'none';
  // startBtn.click();
};

startBtn.addEventListener('click', () => {
  level = select.value;
  if (level == 'easy') {
    numOfBlocks = 5;
  }
  if (level == 'medium') {
    numOfBlocks = 7;
  }
  if (level == 'hard') {
    numOfBlocks = 10;
  }
  createCards(numOfBlocks);
  windowEl.style.animation = 'scalingIn 0.4s linear forwards';
  gameEl.style.filter = 'blur(0)';
  gameEl.style.pointerEvents = 'auto';
  showAll();
  handleClicks();
  timerCounter();
  mainTime = 50;
  time.innerHTML = `${mainTime}`;
});

function createCards(numOfCards) {
  cardsEl.innerHTML = '';
  let arr = [];
  for (let j = 0; j < 2; j++) {
    for (let i = 1; i <= numOfCards; i++) {
      let card = document.createElement('div');
      let front = document.createElement('div');
      let back = document.createElement('div');
      let img = document.createElement(`img`);
      card.className = 'card';
      card.dataset.vis = `av${i}`;
      front.classList.add('face');
      front.classList.add('front');
      back.classList.add('face');
      back.classList.add('back');
      let r1 = Math.floor(Math.random() * numOfCards);
      img.src = `images/av${i}.png`;
      back.appendChild(img);
      card.appendChild(back);
      card.appendChild(front);
      cardsEl.appendChild(card);
    }
  }
}

function showAll() {
  let card = document.querySelectorAll(`.game .cards .card `);
  let secoundAction;
  card.forEach((crd) => {
    card.forEach((crd) => {
      let firstAction = setTimeout(() => {
        crd.classList.add('flipped');
      }, 50);
      secoundAction = setTimeout(() => {
        clearInterval(firstAction);
        crd.classList.remove('flipped');
      }, 1000);
    });
  });
}

function handleClicks() {
  let card = document.querySelectorAll(`.game .cards .card`);
  let orderRange = Array.from(Array(card.length).keys());
  card.forEach((crd, index) => {
    crd.addEventListener('click', () => {
      //get the order of the clicked cards
      if (mainTime != 0) {
        checkClicked(crd);
      } else {
        finsishGame();
      }
    });

    //shuffiling the order
    shuffile(orderRange);

    //set the main order before randoming
    crd.style.order = orderRange[index];
  });
}

function checkClicked(selectedCard) {
  // let card = document.querySelectorAll(`.game .cards .card`);
  let cards = Array.from(document.querySelectorAll(`.game .cards .card`));
  selectedCard.classList.add('is-flipped');

  let allFlippedCards = cards.filter((flippedblock) => flippedblock.classList.contains('is-flipped'));

  //stop clicking more than two cards
  selectedCard.classList.add('is-flipped');
  console.log();
  if (allFlippedCards.length === 2) {
    //stop clicking when two cards are flipped
    stopClicking();
    //check matched cards
    checkStatue(allFlippedCards[0], allFlippedCards[1]);
    //finish the game if all cards solved
  }
  finsishGame();
}

function shuffile(array) {
  let current = array.length,
    temp,
    rand;

  while (current > 0) {
    rand = Math.floor(Math.random() * current);

    current--;

    //save current element in stash
    temp = array[current]; //5

    //current Element = random element
    array[current] = array[rand]; //5 = 4

    //random element = get element from stash
    array[rand] = temp; //4 = 5
  }
}

function stopClicking() {
  let cards = document.querySelector(`.game .cards`);
  cards.style.pointerEvents = 'none';
  setTimeout(() => {
    cards.style.pointerEvents = 'auto';
  }, 200);
}

function checkStatue(firstClick, secoundClick) {
  if (firstClick.dataset.vis === secoundClick.dataset.vis) {
    firstClick.classList.remove('is-flipped');
    secoundClick.classList.remove('is-flipped');
    firstClick.classList.add('is-matched');
    secoundClick.classList.add('is-matched');
  } else {
    mistakes.textContent = `Number Of Mistakes: ${wrong}`;
    setTimeout(() => {
      firstClick.classList.remove('is-flipped');
      secoundClick.classList.remove('is-flipped');
    }, 1000);
    wrong++;
  }
}

function finsishGame() {
  console.log('finished');
  let cards = Array.from(document.querySelectorAll(`.game .cards .card`));
  let allMatchedCards = cards.filter((flippedblock) => flippedblock.classList.contains('is-matched'));
  if (numOfBlocks * 2 === allMatchedCards.length) {
    congrates.textContent = 'Congratulations !!';
    windowEl.style.animation = 'scalingOut 0.4s linear forwards';
    gameEl.style.pointerEvents = 'none';
    gameEl.style.filter = 'blur(3px)';
    clearInterval(tcountTime);
  }
  if (mainTime <= 1) {
    congrates.textContent = 'Remove The Rust From Your Brain !!';
    windowEl.style.animation = 'scalingOut 0.4s linear forwards';
    gameEl.style.pointerEvents = 'none';
    gameEl.style.filter = 'blur(3px)';
    clearInterval(tcountTime);
  }
}

function timerCounter() {
  tcountTime = setInterval(() => {
    if (mainTime > 0) {
      time.textContent = mainTime;
      mainTime--;
    }
  }, 1000);
}
//timer
//finish game function

let footerYear = document.querySelector(`footer .year`);
let date = new Date();
footerYear.textContent = date.getFullYear();
