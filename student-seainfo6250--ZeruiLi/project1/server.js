"use strict";
const { validateUsername } = require(`./validation`);
const { User } = require(`./models`);
const { loginPage, homePage } = require(`./view`);
const express = require(`express`);
const app = express();
const { v4: uuidv4 } = require(`uuid`);
const cookieParser = require(`cookie-parser`);
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(`./public`));
app.use(cookieParser());

/**
 * Stores session IDs and their corresponding user object.
 */
const sessions = {};

/**
 * Maps usernames to their session IDs.
 */
const userSidMap = {};

/**
 * Retrieves a session ID for a given username if it exists.
 * @param {string} username The username to look up the session ID for.
 * @return {string|null} The session ID if found, null otherwise.
 */
const getSidIfUserExists = (username) => {
  if (username in userSidMap) {
    return userSidMap[username];
  }

  return null;
};

/**
 * Associates a new session ID with a username.
 * @param {string} username The username to associate with the session ID.
 * @param {string} sid The session ID to be associated with the username.
 */
const addNewUserSidMapping = (username, sid) => {
  userSidMap[username] = sid;
};

/**
 * Creates a new user object and stores it in the sessions object using the session ID.
 * @param {string} sid The session ID for the new user.
 * @param {string} username The username for the new user.
 */
const addNewUser = (sid, username) => {
  sessions[sid] = new User(username);
};

/**
 * Retrieves the user object associated with a given session ID.
 * @param {string} sid The session ID of the user to retrieve.
 * @return {User} The user object associated with the session ID.
 */
const getUser = (sid) => {
  return sessions[sid];
};

/**
 * Middleware to check the integrity of the game state. If no valid session or game state is found, redirects to the login page.
 * @param {object} req The request object.
 * @param {object} res The response object.
 * @param {function} next The next middleware function in the stack.
 */
const checkGameIntegrity = (req, res, next) => {
  const sid = req.cookies.sid;
  if (sid && sessions[sid] && sessions[sid].game) {
    next(); 
  } else {
    let html = loginPage("Unauthorized game state change detected. Please log in again.");
    res.send(html);
  }
};

app.get(`/`, (req, res) => {
  const sid = req.cookies.sid;
  let htmlToBeRendered;
  if (sid && sid in sessions) {
    const user = getUser(sid);
    htmlToBeRendered = homePage(user);
  } else {
    htmlToBeRendered = loginPage();
  }

  res.send(htmlToBeRendered);
});

app.post(`/login`, validateUsername, (req, res) => {
  const { username } = req.body;
  let sid = getSidIfUserExists(username);
  if (!sid) {
    sid = uuidv4();
    addNewUser(sid, username);
    addNewUserSidMapping(username, sid);
  }
  res.cookie(`sid`, sid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.redirect(`/`);
});

app.post(`/guess`, checkGameIntegrity, (req, res) => {
  let { guessedWord } = req.body;
  guessedWord = guessedWord.trim();
  const sid = req.cookies.sid;
  const user = getUser(sid);
  if (user === undefined) {
    let html = `<h1>Invalid User!! Please login Again</h1>` + loginPage();
    res.send(html);
  } else {
    user.game.guessWord(guessedWord);
    res.redirect(`/`);
  }
});

app.get(`/new-game`, checkGameIntegrity, (req, res) => {
  const sid = req.cookies.sid;
  const user = getUser(sid);
  user.createNewGame();
  res.redirect(`/`);
});

app.post(`/logout`, (req, res) => {
  res.clearCookie(`sid`);
  res.redirect(`/`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
