// I am putting a series of arrays inside an array to access a key within a given array
let blackjackGame = {
    you: {
        scoreSpan: '#your-blackjack-result',
        div: "#your-box",
        boxSize: '.flex-blackjack-row-2 div',
        score: 0,
    },

    dealer: {
        scoreSpan: '#dealer-blackjack-result',
        div: "#dealer-box",
        boxSize: '.flex-blackjack-row-2 div',
        score: 0,
    },

    cards: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],

    cardsMap: {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        J: 10,
        Q: 10,
        K: 10,
        A: [1,11]
    },

    wins:0,
    losses: 0,
    draws: 0,
    isStand: false,
    isTurnsOver: false,
    pressOnce: false,
};

// Finally remembered how to use previous functions instead of rewriting the same code and avoid DRY
const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

// This is just extra stuff like sound effects depending on the result of the match.
// const hitSound = new Audio("");
// const winSound = new Audio("");
// const loseSound = new Audio("");

// This section is more for mobile usage to make the game adjust depending on the screen
let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

//Button Event Listeners
document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

function blackjackHit() {
    if(blackjackGame["isStand"] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard () {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer["score"] <= 21) {
        let cardImage = document.createElement("img");
        cardImage.src = `images/${card}.png`;
        cardImage.style = `width:${widthSize()}; height:${heightSize()};`;
        document.querySelector(activePlayer["div"]).appendChild(cardImage);        
        // hitSound.play();
    }
}

// Since I created the style of the images in the previous function I now need to make sure it adjusts to the screen size of any device.
function widthSize() {
    if (windowWidth > 1000) {
      let newWidthSize = window.screen.width * 0.1;
      return newWidthSize;
    } else {
      return window.screen.width * 0.18;
    }
  }

  function heightSize() {
    if (windowHeight > 700) {
      let newHeightSize = window.screen.height * 0.18;
      return newHeightSize;
    } else {
      return window.screen.height * 0.15;
    }
  }

// This function is to calculate your cards and add them up. Right now it will only show in the console, I have to create another function to show the score.
function updateScore(card, activePlayer) {
    if (card === "A") {
      if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
        activePlayer["score"] += blackjackGame["cardsMap"][card][1];
      } else {
        activePlayer["score"] += blackjackGame["cardsMap"][card][0];
      }
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card];
    }
  
    console.log(activePlayer["score"]);
  }

// This function will now take our previous function and show the score on your card total and dealer cards total
function showScore(activePlayer) {
    //Bust logic if score is over 21
    if (activePlayer["score"] > 21) {
      document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
      document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
    } else {
      document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
    }
  }