// type="module" in the index.html imports the script.js to the html
//import the deck class from deck.js
import Deck from './deck.js'

const deck = new Deck()
deck.shuffle()
console.log(deck.cards)