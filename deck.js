var dealerSum= 0;
var yourSum= 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden;
var deck;

var canHit = true; // allows the player to draw while playerSum <= 21

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

// build deck function
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types =  ["C", "D", "H", "S"];
    deck = [];

    // this loop is to use both the value and types arrays to get a card in the console it will show your deck
    for (let i = 0; i < types.length; i++) {
        for(let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
    // console.log(deck);
}
// Had to delete previous code as I was running an infinite loop
// Now I create a shuffle function to shuffle cards on load to avoid it stacking in order
function shuffleDeck() {
    // to make it random I had to introduce Math.random but in order to have a whole number I use math.floor(math.random) to move the value to the closest integer to avoid having numbers like 51.99999...
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);

    while (dealerSum < 17) {

        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    // Now that the cards load in I have to add an event listener for the "Hit" and "Stay" buttons
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}
// time to add functions to those event listeners
function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./Cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./Cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!"
    }
    else if (dealerSum > 21) {
        message = "You Win!";
    } 
    //if both you and the dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Tie!"
    }
    else if (yourSum > dealerSum){
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    // Time to display the results
     document.getElementById("results").innerText = message;
}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //This is to make each letter equal a value ie. A = 11 else K, Q, J = 10
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] =="A") {
        return 1;
    }
    return 0;
}

// this function is to make the Ace either a 1 or stay as an 11 depending on what you drew without going over withiout going over 21
function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -=10;
        playerAceCount -= 1;
    }
    return playerSum;
}