"use strict";
const words = require("./words.js");

/**
 * Generates the HTML for the login page.
 * @return {string} HTML string for the login page.
 */
const loginPage = () => {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
        <title>Login Word Guessing Game</title>
      </head>
      <body>
        <div class="login-container">
          <div id="content" class="content-container">
            <form action="/login" method="POST"> 
                <h1>Word Guessing Game</h1>    
              <div class="text-input" id="login_username">
                <input name="username" placeholder="Enter your username" > 
                <div class="space">
                  <button class="login-button" type="submit">LOGIN</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </body>
    </html>
    `;
};

/**
 * Generates the HTML for displaying an invalid username error message.
 * @param {string} errorMessage The error message to display.
 * @return {string} HTML string displaying the error message and a login button.
 */
const invalidUserNameHtml = (errorMessage) => {
  return `
    <link rel="stylesheet" href="/style.css" />
    <h2>${errorMessage}</h2>
    <h3>Please Login Again..!!</h3>
    <form method="GET" action="/">
    <button class="login-button" type="submit">Login</button>
    </form>
  `;
};

/**
 * Generates the HTML for the home page, showing game details and allowing word guesses.
 * @param {object} user The user object containing game state and username.
 * @return {string} HTML string for the home page, including game state and controls.
 */
const homePage = (user) => {
    return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
        <title>Word Guessing Game</title>
      </head>
      <body>
        <div id="word-guessing-game">
          <div class="page-title">
            <h2>Word Guessing Game, Welcome ${user.username}</h2>
            <div class="logout"> 
              <form action="/logout" method="POST"> 
                <button class="logout-button" type="submit">LOGOUT</button>
              </form>
            </div>
          </div>
          <div class="game-panel">
            <div class="word-list-panel">
            <h3 class="title">Acceptable Words List:</h3>
              <div class="word-list">
                ${words.map(word => `<p class="word">${word}</p>`).join("")}
              </div>
              <p>Instruction : 
              <br>
              1.The secret word is one of the words from Acceptable Words List, Start Guessing the word!!
              <br>
              2.A guess is invalid if the guessed word is not in the Acceptable Words List.
              <br>
              3.Your score is the count of number of valid guesses you make
              <br>
              4.If you win the match, click on RESTART button to play again.
              <br> 
              </p>
            </div>
            <div class="game-panel-container">
              <p class="turns">
                Number Of Valid Guesses: ${user.game.numberOfValidGuesses}
                <br><br>
                <span className="score">
                ${
                  user.game.guessedWords.length > 0
                    ? `Your Previous Valid Guess: ${user.game.guessedWords[0].guessedWord} matched ${user.game.guessedWords[0].numberOfMatchingLetters} letters with secret word`
                    : ""
                }
                </span>
              </p>
              <div class="control-panel">
                <div class="word-input">
                  <form action="/guess" method="POST"> 
                    <input id="guess-field" name="guessedWord" placeholder="Type your guess" required ${
                      user.game.isGameWon ? "disabled" : ""
                    }> 
                    <button class="guess-button" type="submit" ${
                      user.game.isGameWon ? "disabled" : ""
                    }>GUESS</button>
                  </form>
                  <div class="message-panel">
                  ${user.game.message}
                  </div> 
                  <div class="controls">
                    <div class="restart"> 
                      <form action="/new-game" method="GET"> 
                        <button class="restart-button" type="submit">RESTART</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accepted-guess-panel">
                <h3>Your valid Guesses & Letter Match History</h3>
                <div class="history-panel">
                    ${user.game.guessedWords
                      .map(guess => `<div><span class="word">You guessed "${guess.guessedWord}"</span> : <span class="word">matched ${guess.numberOfMatchingLetters} letters with secret word</span></div>`)
                      .join("")}
                </div>
              </div>
            </div>
          </div> 
        </div>
      </body>
    </html>
    `;
  };
  

module.exports = { loginPage, invalidUserNameHtml, homePage };
