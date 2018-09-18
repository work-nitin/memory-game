/*list that holds all of our cards*/
const cardArray =["fa fa-diamond" , "fa fa-diamond" , "fa fa-paper-plane-o" ,"fa fa-paper-plane-o" ,"fa fa-anchor", "fa fa-anchor", "fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf",
"fa fa-leaf", "fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"];

//move all the cards into cardsDeck
const cardsDeck = document.querySelector(".deck");
let openedCards = [];
let matchedCards =[];

// loop over all the cards and invoke a function to check individual cards

function init()
{
  for ( let i=0; i < cardArray.length ; i++)
  {
  const card =document.createElement("li");
  card.classList.add("card");
  card.innerHTML= `<i class ="${cardArray[i]}"></i>`;
  cardsDeck.appendChild(card);

  click(card); //invoke the function which acts on any individual card

  } // END OF FOR loop

} // END OF Init Function


function click(card)
{
card.addEventListener("click" , function() {
  const currentCard = this;
  const previousCard= openedCards[0];

  if (openedCards.length === 1){
    card.classList.add("open", "show" , "disable");
    openedCards.push(this);

    compare(currentCard,previousCard);
  }
      else {
        currentCard.classList.add("open", "show","disable");
        openedCards.push(this);
      }

}); // End of event listener ends
} //End of Click card FUNCTION


/* Compare the two cards within the function */
function compare (currentCard,previousCard)
{
  if (currentCard.innerHTML === previousCard.innerHTML)
  {
    //card matched
    currentCard.classList.add("match");
    previousCard.classList.add("match");
    matchedCards.push(currentCard,previousCard);

    openedCards =[];
    isOver(); //call the function when game is overs

  } // end of IF STATEMENT

// when card doesnt matched
   else {

    setTimeout(function(){
    currentCard.classList.remove("open" , "show","disable");
    previousCard.classList.remove("open" , "show","disable");
    openedCards =[];
  },500);

  } // END OF ELSE

// add functionality of moves
//addMove();

  }


// Check if the game is over or not
function isOver(){
  if (matchedCards == cardArray)
  {
    console.log("game overs");
  }
}

/* let moves=0;
functon addMove (){

  moves++;
} */

/* Restart Button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click" , function(){

  //Delete all the cardsDeck
  cardArray.innerHTML = "";

//Initiallze all the cards again so that we can display the empty cards
  init();

  // clear any elements which is still in the matched cards variable
  matchedCards=[];
});*/

init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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
