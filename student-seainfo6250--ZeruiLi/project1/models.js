"use strict";
const { getRandomSecretWord, isGuessedWordValid, calculateMatchingLetters, isGuessedWordSameAsSecret } = require(`./game-helpers`);

/**
 * Creates a guess object with the guessed word and the number of letters matching the secret word.
 * @param {string} guessedWord The word guessed by the player.
 * @param {number} numberOfMatchingLetters The number of letters in guessedWord that match the secret word.
 * @return {object} An object representing a guess, including the guessed word and number of matching letters.
 */
function createGuess(guessedWord, numberOfMatchingLetters) {
  return { guessedWord, numberOfMatchingLetters };
}

/**
 * Initializes a new game with a secret word and manages guesses and game state.
 * @param {string} secretWord The word players try to guess.
 * @return {object} A game object with methods and properties to manage the gameplay.
 */
function createGame(secretWord) {
  let game = {
    secretWord,
    numberOfValidGuesses: 0,
    guessedWords: [],
    isGameWon: false,
    message: `Try to guess the secret word!`,
    guessWord: function(guessedWord) {
      if (this.guessedWords.find(w => w.guessedWord === guessedWord)) {
        this.message = `You have already guessed ${guessedWord}! Try a new word from the list!`;
        return;
      }

      if (!isGuessedWordValid(guessedWord)) {
        this.message = `Invalid word! ${guessedWord} is not in the acceptable word list. Try Again!`;
        return;
      }

      this.numberOfValidGuesses++;
      const numberOfMatchingLetters = calculateMatchingLetters(this.secretWord, guessedWord);
      this.guessedWords.push(createGuess(guessedWord, numberOfMatchingLetters));

      this.isGameWon = isGuessedWordSameAsSecret(this.secretWord, guessedWord);
      this.message = this.isGameWon ? `Congratulations! You won! Hit RESTART to play again!` : `Try to guess the secret word!`;
    }
  };

  return game;
}

/**
 * Creates a user with a username and initializes a game for the user.
 * @param {string} username The username of the player.
 * @return {object} A user object with a username, current game state, and method to create a new game.
 */
function createUser(username) {
  let user = {
    username,
    game: createGame(getRandomSecretWord()),
    createNewGame: function() {
      this.game = createGame(getRandomSecretWord());
      console.log(`Secret word for user "${this.username}" is "${this.game.secretWord}"`);
    }
  };

  user.createNewGame(); 
  return user;
}

module.exports = { Game: createGame, Guess: createGuess, User: createUser };
