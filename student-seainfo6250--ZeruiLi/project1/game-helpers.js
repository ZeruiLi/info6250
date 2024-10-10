"use strict";
const words = require("./words.js");

/**
 * Selects a random word from the list of words.
 * @return {string} A random word from the list.
 */
const getRandomSecretWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

/**
 * Checks if the guessed word is valid and exists in the list of words, ignoring case.
 * @param {string} guessedWord The word guessed by the player.
 * @return {boolean} True if the guessed word is in the list, false otherwise.
 */
const isGuessedWordValid = (guessedWord) => {
  return words.includes(guessedWord.toLowerCase());
};

/**
 * Checks if the guessed word matches the secret word, ignoring case.
 * @param {string} secretWord The secret word to be guessed.
 * @param {string} guessedWord The word guessed by the player.
 * @return {boolean} True if the guessed word matches the secret word, false otherwise.
 */
const isGuessedWordSameAsSecret = (secretWord, guessedWord) => {
  return secretWord.toLowerCase() === guessedWord.toLowerCase();
};

/**
 * Calculates the number of matching letters between the secret word and the guessed word, 
 * considering each letter's occurrence. Comparison is case-insensitive.
 * @param {string} secretWord The secret word to be guessed.
 * @param {string} guessedWord The word guessed by the player.
 * @return {number} The count of matching letters between the secret word and the guessed word.
 */
const calculateMatchingLetters = (secretWord, guessedWord) => {
  const lowerSecretWord = secretWord.toLowerCase();
  const lowerGuessedWord = guessedWord.toLowerCase();
  
  const letterCount = {};
  for (const letter of lowerSecretWord) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }
  
  let matchCount = 0;
  for (const letter of lowerGuessedWord) {
    if (letterCount[letter] && letterCount[letter] > 0) {
      matchCount++;
      letterCount[letter]--;
    }
  }
  
  return matchCount;
};

module.exports = {
  getRandomSecretWord,
  isGuessedWordValid,
  calculateMatchingLetters,
  isGuessedWordSameAsSecret,
};
