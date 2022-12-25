const gameBoard = document.getElementById("game-board");
const scoreDiv = document.getElementById("score");
const startButton = document.getElementById("start-button");

let score = 0;
let cards = [];
let flippedCards = [];

// Define the love-themed pairs
const pairs = [  {    symbol: "❤️",    color: "red"  },  {    symbol: "💕",    color: "pink"  },  {    symbol: "💘",    color: "lightpink"  },  {    symbol: "💖",    color: "purple"  },  {    symbol: "💗",    color: "red"  },  {    symbol: "💝",    color: "pink"  }];

// Shuffle the pairs
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create the game board
function createBoard() {
  // Duplicate the pairs to create a full set of cards
  const fullSet = pairs.concat(pairs);
  // Shuffle the full set of cards
  shuffle(fullSet);
  // Create the cards and add them to the game board
  fullSet.forEach(pair => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = pair.symbol;
    card.style.color = pair.color;
    card.innerHTML = pair.symbol;
    card.addEventListener("click", flipCard);
    cards.push(card);
    gameBoard.appendChild(card);
  });
}

// Flip a card when clicked
function flipCard() {
  // Ignore the card if it is already flipped or if there are already two flipped cards
  if (this === flippedCards[0] || flippedCards.length === 2) {
    return;
  }
  this.style.color = "black";
  flippedCards.push(this);
  // Check for a match if there are two flipped cards
  if (flippedCards.length === 2) {
    if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
      // Increment the score and add the "match" class to the matched cards
      score++;
      flippedCards[0].classList.add("match");
      flippedCards[1].classList.add("match");
    } else {
      // Flip the cards back over after a short delay
      setTimeout(() => {
        flippedCards[0].style.color = flippedCards[0].dataset.color;
        flippedCards[1].style.color = flippedCards[1].dataset.color;
      }, 1000);
    }
    // Reset the flipped cards array and update the score
    flippedCards = [];
    scoreDiv.innerHTML = `Score: ${score}`;
    // Check for a win
    if (score === pairs.length) {
      alert("You won! Jazzmin, you are the love of my life and I am so grateful to have you by my side on this special Christmas.");
    }
  }
}

// Define the start game function
function startGame() {
  // Clear the game board and reset the score
  gameBoard.innerHTML = "";
  score = 0;
  scoreDiv.innerHTML = `Score: ${score}`;
  // Create the game board
  createBoard();
}

// Add a click event listener to the start button
startButton.addEventListener("click", startGame);
