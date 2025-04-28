// Get references to DOM elements
const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');

// Game variables
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let totalCards = 16; // 8 pairs

// Card values (pairs)
const cardValues = ['1', '2', '3', '4', '5', '6', '7', '8'];

const shuffleCards = () => {
  // Duplicate the card values to make pairs, then shuffle them
  let allCards = [...cardValues, ...cardValues];
  allCards = allCards.sort(() => Math.random() - 0.5); // Shuffle

  // Create card elements
  cards = allCards.map(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    return card;
  });

  // Add the cards to the game board
  gameBoard.innerHTML = '';
  cards.forEach(card => gameBoard.appendChild(card));
};

// Flip a card and check for matches
const flipCard = (e) => {
  const card = e.target;

  // Don't flip if card is already flipped or if two cards are already flipped
  if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.value; // Display card value

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
};

// Check if two flipped cards match
const checkForMatch = () => {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    matchedCards += 2;
    flippedCards = []; // Reset flipped cards
    if (matchedCards === totalCards) {
      alert("You win!");
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      flippedCards = []; // Reset flipped cards
    }, 1000);
  }
};

// Restart the game
const restartGame = () => {
  matchedCards = 0;
  flippedCards = [];
  shuffleCards();
};

// Initialize the game
shuffleCards();

// Restart game event listener
restartBtn.addEventListener('click', restartGame);
