let randomAnswer = getRandom();
const MAX_TRIAL = 10;
const submit = document.querySelector("#subt");
const guess = document.querySelector("#guessField");
const guesses = document.querySelector(".guesses");
const guessesArray = [];
const result = document.querySelector(".lowOrHi");
const remaining = document.querySelector(".lastResult");
const startOver = document.querySelector(".resultParas");
const p = document.createElement("p");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const input = parseInt(guess.value);

  if (!isValid(input)) {
    alertError(input);
    return false;
  }

  processResult(input);
});

function getRandom() {
  return parseInt(Math.random() * 100 + 1);
}
function isValid(input) {
  if (!isFinite(input)) return false;
  else if (input > 100 || input < 1) return false;

  return true;
}

function alertError(input) {
  if (!isFinite(input)) alert("Please enter a valid number");
  else if (input < 1) alert("Please enter a number greater than 1!");
  else if (input > 100) alert("Please enter a number less than 100!");
}

function processResult(input) {
  addGuess(input);
  checkGuess(input);
}

function addGuess(input) {
  guessesArray.push(input);
  if (guessesArray.length >= MAX_TRIAL) {
    message(`Game Over! Number was ${randomAnswer}`);
    endGame();
    return false;
  }
  guess.value = "";
  guesses.innerHTML = `${guessesArray.join(" ")}`;
  remaining.innerHTML = `${10 - guessesArray.length}`;
}
function checkGuess(input) {
  console.log(input);
  if (input == randomAnswer) {
    message("You guessed correctly!");
    endGame();
  } else if (input < randomAnswer) message(`Too low! Try again!`);
  else if (input > randomAnswer) message(`Too High! Try again!`);
}
function message(str) {
  result.innerHTML = `<h1>${str}</h1>`;
}
function endGame() {
  p.classList.add("button");
  p.innerHTML = `<h1 id="newGame">Start New Game</h1>`;
  startOver.appendChild(p);
  newGame();
}
function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", () => {
    randomAnswer = getRandom();
    clearArray();
    guess.value = "";
    guesses.innerHTML = "";
    remaining.innerHTML = "10";
    result.innerHTML = "";
    startOver.removeChild(p);
  });
}
function clearArray() {
  const len = guessesArray.length;
  for (let i; i < len; i++) guessesArray.pop();
}
