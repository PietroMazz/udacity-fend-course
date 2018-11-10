// Global variables
let movesCounter = 0;
let scoreStars = 3;
let timerCounter = 0;
let winCondition = 0;
let openCards = [];
let matching = 0;
let reset = 0;

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array)
{
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0)
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// This function deals with the score, changing the number of stars

function scoreDealer()
{
  for (let i = 0; i < stars.length; i++)
  {
    stars[i].style.visibility = 'hidden';
  }
  for (let i = 0; i < scoreStars; i++)
  {
    stars[i].style.visibility = 'visible';
  }
  if (movesCounter <= 12)
  {
    scoreStars = 3;
  }
  else if (movesCounter <= 20)
  {
    scoreStars = 2;
  }
  else
  {
    scoreStars = 1;
  }
}


function resetCards()
{
  openCards[0].classList = ['card'];
  openCards[1].classList = ['card'];
  openCards = [];
  matching = 0;
}

function win()
{
  if (confirm("You win! Time:" + timerCounter + "\nStars:" + scoreStars + "\nClick OK to restart the game :D"))
  {
    restartGame();
  }
  else alert("Thank you! Goodbye!");
}

// This functione provides the functionality to make the game works
// It adds the match class when a couple of card is guessed
// And it sets the matching process (matching variable) when a card is rotated

function game()
{
  if (openCards.length > 0)
  {
    if (openCards.length > 1)
    {
      movesCounter++;
      if (openCards[0].firstElementChild.classList[1].toString() === openCards[1].firstElementChild.classList[1].toString())
      {
        openCards[0].classList.toggle('match');
        openCards[1].classList.toggle('match');
        winCondition++;
        openCards = [];
        if (winCondition >= 8)
        {
          setTimeout(win, 1000);
        }
      }
      else
      {
        matching = 1;
        setTimeout(resetCards, 1000);
      }
    }
  }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function clickedCard()
{
  if (matching || this.classList.contains('open') || this.classList.contains('match'))
  {
    return;
  }
  this.classList.toggle('open');
  this.classList.toggle('show');
  openCards.push(this);
  document.querySelector('.moves').textContent = movesCounter;
  //Update score
  scoreDealer(stars);
  game();
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card to the page
 *   - add an event listener for click to each card, for playing
 */

function shuffleCards()
{
  //Reset the cards event listeners and clears the classes of the cards
  for (let i = 0; i < cards.length; i++)
  {
    cards[i].removeEventListener('click', clickedCard);
    cards[i].classList = ['card'];

  }
  /*
   * Create a list that holds all of your cards
   */
  let cardsArray = []
  for (let i = 0; i < cards.length; i++)
  {
    cardsArray.push(cards[i]);
  }
  shuffle(cardsArray);
  // Reset the game board, and append the new cards from the list created
  const deck = document.querySelector('.deck');
  while (deck.firstChild)
  {
    deck.removeChild(deck.firstChild);
  }
  for (let i = 0; i < cards.length; i++)
  {
    deck.appendChild(cardsArray[i]);
  }
  cards = document.querySelectorAll('.card');
  for (let i = 0; i < cards.length; i++)
  {
    deck.appendChild(cardsArray[i]);
    cards[i].addEventListener('click', clickedCard);
  }
}

//I created a timer with a counter increased by a function
//that calls itself with a timeout

function setTimer()
{
  if (winCondition >= 8 || reset === 1)
  {
    reset = 0;
    return;
  }
  document.querySelector('.timer').textContent = timerCounter;
  setTimeout(setTimer, 1000);
  timerCounter++;
}

/* Function to restart the game:
 * - it resets the moves counter, and updates the number of stars displayed
 * - it resets the timer counter
 * - it resets the game board, reshuffling the cards
 * - it resets all the other variables declared at the beginning
 */
function restartGame()
{
  openCards = [];
  movesCounter = 0;
  scoreStars = 3;
  timerCounter = 0;
  winCondition = 0;
  matching = 0;
  reset = 1;
  document.querySelector('.moves').textContent = movesCounter;
  shuffleCards();
  scoreDealer();
  setTimer();
}

//I'm taking the initial cards list, that I have to shuffle and the stars selector

let cards = document.querySelectorAll('.card');
const stars = document.getElementsByClassName('fa-star');

//I'm setting the timer which every second increases because of setTimer function



document.addEventListener('DOMContentLoaded', setTimer);

document.addEventListener('DOMContentLoaded', shuffleCards);

document.querySelector('.restart').addEventListener('click', restartGame);