// Global Const
const SUITS =  ["♠", "♣", "♥", "♦"]
const VALUE = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

// Create Deck and export to the script.js
export default class Deck {
    constructor (cards = freshDeck()) {
        this.cards = cards
    }

    //Encapsulate the number of cards using get
    get numberOfCards() {
        return this.cards.length
    }

    //create a shuffle function to make cards random instead of in order. Note the shuffle function is nested within the Deck class
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--){
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card{
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}

//Create a fresh deck function to reset the deck after each game
//The returns loop through our values and maps them into an array. Ex. A♠, K♠, Q♠
function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUE.map(value => {
            return new Card(suit, value)
        })
    })
}
