//Declare Global variables
const cardsDeck = document.querySelector( ".deck" );
const modal = document.querySelector(".modal");
let openedCards = [];
let matchedCards = [];
const cardArray =["fa fa-leaf" , "fa fa-bomb" , "fa fa-cube" ,"fa fa-paper-plane-o" ,"fa fa-anchor", "fa fa-anchor", "fa fa-bicycle","fa fa-bolt","fa fa-paper-plane-o","fa fa-cube","fa fa-diamond",
"fa fa-leaf", "fa fa-bicycle","fa fa-bolt","fa fa-diamond","fa fa-bomb"];


/* TODO: add card elements */
// Initialize a dynamic card and loop over them and invoke a function which checks action on individual cards
function init() {
  // Shuffle the current `cardArray`
const icons = shuffle(cardArray);
	for ( let i = 0; i < cardArray.length; i++ ) {
		const card = document.createElement( "li" );
		card.classList.add( "card" );
		card.innerHTML = `<i class ="${cardArray[i]}"></i>`;
		cardsDeck.appendChild( card );
		/*For alll the cards , invoke the function which acts on individual card untill cardArray finishes*/
		addCardListener(card);

	} // END OF FOR loop

} // END OF Init Function


/* Function which listens the event listener ; open and show the card when a card is clicked:*/
/* TODO: Prevent the user from selecting the same card twice using disable property */
function addCardListener(card) {
	card.addEventListener( "click", function() {
		const currentCard = this;
		const previousCard = openedCards[ 0 ];

		if ( openedCards.length === 1 ) {
			card.classList.add( "open", "show", "disable" );
			openedCards.push( this );
			compare( currentCard, previousCard );
		} else {
			currentCard.classList.add( "open", "show", "disable" );
			openedCards.push( this );
		}

	} ); // End of event listener ends
} //End of Click card FUNCTION


/* Compare the two cards within below function
if the cards do match, lock the cards in the open position ; if the cards do not match, remove the cards from the list and hide the card's symbol*/
function compare( currentCard, previousCard ) {
	if ( currentCard.innerHTML === previousCard.innerHTML ) {
		//card matched
		currentCard.classList.add( "match" );
		previousCard.classList.add( "match" );
		matchedCards.push( currentCard, previousCard );

		openedCards = [];
		endofGame(); //call the function when game is overs
	} // end of IF STATEMENT

	/* when card doesnt matched -wait for few milliseconds*/
	else {
		setTimeout( function() {
			currentCard.classList.remove( "open", "show", "disable" );
			previousCard.classList.remove( "open", "show", "disable" );
		}, 350 );

		/* Initiallze the open cards again to remove the disable functionality */
		openedCards = [];
	} // END OF ELSE

	/* Invoke the move function whether match or unmatched cards got clicked */
	addMove();
} // End of compare function

// Check if the game is over or not
function endofGame(){
  // Check if the `matchedCards` length equals to the `cardArray`
      if (cardArray.length === matchedCards.length) {
          IsgameOver();

      }

}

/*
 * Display the Message when game is over
 */

function IsgameOver() {
    // Display the modal
    modal.style.top = "0";
    // Add moves to the Modal

    const totalMoves = document.querySelector("#total_moves");
    totalMoves.innerHTML = moves +1;

}


/* Funciton to control the number of moves when
user clicks on the deck card for matched/unmatched instances and display it on the page*/
const movesContainer = document.querySelector( ".moves" );
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
	moves++;
	movesContainer.innerHTML = moves;
}

/* Restart Button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click" , function(){

  //Delete all the cardsDeck
  cardArray.innerHTML = "";

//Initiallze all the cards again so that we can display the empty cards
  init();

  // clear any elements which is still in the matched cards variable
  matchedCards=[];
  moves=0;
  movesContainer.innerHTML = moves;
});*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle( array ) {
	var currentIndex = array.length
		, temporaryValue, randomIndex;

	while ( currentIndex !== 0 ) {
		randomIndex = Math.floor( Math.random() * currentIndex );
		currentIndex -= 1;
		temporaryValue = array[ currentIndex ];
		array[ currentIndex ] = array[ randomIndex ];
		array[ randomIndex ] = temporaryValue;
	}

	return array;
}

init();
