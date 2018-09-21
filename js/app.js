//Declare Global variables

let openedCards = [],
    matchedCards = [],
    firstClick = true,
    hours, minutes, seconds,
    totalTime = 0,
    counter;

const cardsDeck = document.querySelector( ".deck" ),
      modal = document.querySelector( ".modal" ),
      starsContainer = document.querySelector( ".stars" ),
      initialArray =["fa fa-leaf", "fa fa-paper-plane-o" ,"fa fa-anchor", "fa fa-bicycle" , "fa fa-cube","fa fa-diamond", "fa fa-bolt","fa fa-bomb"],
      cardArray = initialArray.concat(initialArray),
      secondsContainer = document.querySelector("#seconds"),
      minutesContainer = document.querySelector("#minutes"),
      hoursContainer   = document.querySelector("#hours");
console.log(initialArray);
console.log(cardArray);



/* TODO: add card elements */

// Initialize a dynamic card and loop over them and invoke a function which checks action on individual cards

function init() {

	// Shuffle the current `cardArray`

//	const box = shuffle(cardArray);

	for ( let i = 0; i < cardArray.length; i++ ) {

		const card = document.createElement( "li" );

		card.classList.add( "card" );

		card.innerHTML = `<i class ="${cardArray[i]}"></i>`;

		cardsDeck.appendChild( card );

		/*For alll the cards , invoke the function which acts on individual card untill cardArray finishes*/

		clickCardListener( card );



	} // END OF FOR loop



} // END OF Init Function





/* Function which listens the event listener -click  ; open and show the card when a card is clicked:*/

/* TODO: Prevent the user from selecting the same card twice using disable property */

function clickCardListener( card ) {

	card.addEventListener( "click", function() {

		const currentCard = this;

		const previousCard = openedCards[ 0 ];


                // The First Click? Start the timer!

                if(firstClick) {

                    startTimer();

                    firstClick = false; // This will prevent the timer to start again if the user clicked on another card

                }






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

		endofGame(); //call to check if game is over or not

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



	/* Function to capture the number of moves whether match or unmatched cards got clicked */

	trackMoves();

} // End of compare function



// Check if the game is over or not

function endofGame() {

	// Check if the `matchedCards` length equals to our original cards `cardArray`

	if ( cardArray.length === matchedCards.length ) {

    // Stop Timer

    stopTimer();



		modalMessage();



	}



}



/*

 * Pop up the modal and Display the Message when game is over

 */



function modalMessage() {

	const winMessage = document.querySelector( ".modal-message" );
	modal.style.display = "block";

  const successMovesContainer = document.querySelector( ".successMoves" );
	successMovesContainer.innerHTML = moves + 1;

    const rankContainer = document.querySelector( ".playerRanking" );
	rankContainer.innerHTML = 	starsContainer.innerHTML;

  // Add time to the Modal

 const totalHours       = document.querySelector("#totalHours");

 const totalMinutes     = document.querySelector("#totalMinutes");

 const totalSeconds     = document.querySelector("#totalSeconds");

    totalHours.innerHTML   = hours;

    totalMinutes.innerHTML = minutes;

    totalSeconds.innerHTML = seconds;
}





/* Funciton to control the number of moves when

user clicks on the deck card for matched/unmatched instances and display it on the page*/

const movesContainer = document.querySelector( ".moves" );

let moves = 0;

movesContainer.innerHTML = 0;



function trackMoves() {

	moves++;

	movesContainer.innerHTML = moves;



	//call the rating function



	starRating();

}



/* Restart Button */

const restartBtn = document.querySelector( ".restart" );


restartBtn.addEventListener( "click", function() {

	// Start the game again



	restartGame();

} );



const playAgainBtn = document.querySelector( ".play-again" );

playAgainBtn.addEventListener( "click", function() {

	// Start the game again



	restartGame();

} );





function restartGame() {

    hoursContainer.innerHTML = "00";

    minutesContainer.innerHTML = "00";

    secondsContainer.innerHTML = "00";

    stopTimer();

    firstClick = true;

    totalTime = 0;

    hours = 0;

    minutes = 0;

    seconds = 0;

	   modal.style.display = "none";

	   cardsDeck.innerHTML = "";

	matchedCards = [];/* Clear the Matched card array when user clicks on restart */

  openedCards =[]; /* Clear the opened card array when user clicks on restart */

	movesContainer.innerHTML = moves;

	moves = 0;

	starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';

	// Start the game again

	init();



}



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



/* Rating : The game displays a star rating (from 1 to at least 3) that reflects the player's performance.
 At the beginning of a game, its 3 stars. After 10 number of moves, it changes to 2 star rating.
  After 16 moves, it changes to one star rating (down to 1).

*/

function starRating() {
	if ( moves > 10 ) {
		starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
	}
	if ( moves > 16 ) {

		starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li> ';

	}

}





/*
 * start the timer using the library setInterval func

 */

function startTimer() {

    // Start counter

      counter = setInterval(function() {


        // Add totalTime by 1

        totalTime += 1;



        // Convert Total Time to H:M:S

        calculateTime(totalTime);



        // Change the current time values

        secondsContainer.innerHTML = seconds;

        minutesContainer.innerHTML = minutes;

        hoursContainer.innerHTML   = hours;



    }, 1000);





}

/*

 * Calculate Time
 */

function calculateTime(totalTime) {

    hours   = Math.floor( totalTime / 60 / 60);

    minutes = Math.floor( (totalTime / 60) % 60);

    seconds = totalTime % 60;

}

/*
use the library clearInterval and pass counter to it to stop the timer.
 */

function stopTimer() {

    // Stop Timer

    clearInterval(counter);

}


init();
