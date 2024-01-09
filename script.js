document.addEventListener("DOMContentLoaded", function() {
	
	const amountOfCards = prompt('Enter the amount of pairs');
	if (amountOfCards > 26) {
		alert('Maximum number of pairs - 26');
		location.reload();
	}

	counter.textContent = amountOfCards;
	let constValues = [];

	for (let i = 0; i < 26; i++){
	    constValues.push(String.fromCharCode(i + 65));
	}
	let cards = [];
	for (let i = 0; i < amountOfCards; i++) {
  		cards.push(constValues[i]); 
	}
	cards = cards.concat(cards);
	let openedCards = [];
	let matchedCards = [];

	function shuffle(array) {
	    let currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex--;

	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }
	    return array;
	}

	function renderCards() {
	    const shuffledCards = shuffle(cards);
	    const gameBoard = document.getElementById('gameBoard');
	    shuffledCards.forEach((value, index) => {
	        const card = document.createElement('div');
	        card.className = 'card';
	        card.dataset.value = value;
	        card.dataset.index = index;
	        card.textContent = '?';
	        card.addEventListener('click', flipCard);
	        gameBoard.appendChild(card);
	    });
	}

	function flipCard(event) {
	    const card = event.target;
	    if (!openedCards.includes(card) && openedCards.length < 2) {
	        openedCards.push(card);
	        card.textContent = card.dataset.value;
	    }

	    if (openedCards.length === 2) {
	        const [card1, card2] = openedCards;
	        if (card1.dataset.value === card2.dataset.value) {
	        	if (matchedCards.indexOf(card1) === -1) {
	        		matchedCards.push(card1, card2);
	        		const count = parseInt(document.getElementById('counter').innerText);
	        		counter.textContent = count - 1;
	        		card1.style.backgroundColor = "#424769";
	        		card2.style.backgroundColor = "#424769";
	        	}
	            if (matchedCards.length === cards.length) {
	                setTimeout(() => {
	                    alert('Congratulations! You have found all the pairs.');
	                }, 500);
	            }
	        } else {
	            setTimeout(() => {
	                card1.textContent = '?';
	                card2.textContent = '?';
	            }, 500);
	            counter.textContent = amountOfCards;
	            for (let i = 0; i < matchedCards.length; i++) {
	            	matchedCards[i].textContent = '?';
	            	matchedCards[i].style.backgroundColor = "#7077A1";
	            }
	            matchedCards = [];
	        }
	        openedCards = [];
	    }
	}
	renderCards();

});
function myButton() {
	location.reload(); 
}
