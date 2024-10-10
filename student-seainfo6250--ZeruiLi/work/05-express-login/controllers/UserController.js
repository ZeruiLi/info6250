// Import necessary modules
const { v4: uuidv4 } = require("uuid"); // For generating unique session IDs
const UserModel = require("../models/UserModel"); // Import the user model for validation
const views = require("../views/views"); // Import view templates for rendering HTML

// Initialize session and word storage
const sessions = {}; // Object to store session information
const words = {}; // Object to store words added by users

const UserController = {
  // Display the home page
  index: (req, res) => {
    const sid = req.cookies.sid; // Retrieve session ID from cookies
    if (sid && sessions[sid]) { // Check if session ID is valid
      const username = sessions[sid].username; // Get the username from the session
      const word = words[username] ? words[username].word : ""; // Retrieve the last word added by the user, if any
      // Send a welcome message with the last word added, if available
      res.send(views.generateHTML(`Welcome ${username}`, `Your Previous word was: ${word}`, views.addWordForm(), views.logoutForm()));
    } else {
      // If no valid session, prompt the user to log in
      res.send(views.generateHTML("Please Login", "", views.loginForm()));
    }
  },
  // Handle login requests
  login: (req, res) => {
    const username = req.body.username.trim(); // Trim the username to remove whitespace
    const [isValid, errorMessage] = UserModel.validateUserName(username); // Validate the username
    if (!isValid) { // If validation fails
      const statusCode = errorMessage === "Username 'dog' is not allowed" ? 403 : 400; // Determine the status code based on the error
      // Respond with an error message and status code
      res.status(statusCode).send(views.generateHTML("Login Failed", errorMessage, views.retryLoginButton()));
      return;
    }
    const sid = uuidv4(); // Generate a unique session ID
    sessions[sid] = { username }; // Store the session with the username
    // Set a cookie with the session ID and redirect to the home page
    res.cookie("sid", sid, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }).redirect("/");
  },
  // Handle add word requests
  addWord: (req, res) => {
    const sid = req.cookies.sid; // Retrieve session ID from cookies
    if (sid && sessions[sid]) { // Check if the user is logged in
      const username = sessions[sid].username; // Get the username from the session
      words[username] = { word: req.body.word }; // Store the word under the user's name
      res.redirect("/"); // Redirect to the home page
    } else {
      // If the user is not logged in, respond with an unauthorized status
      res.status(401).send("Unauthorized: Please login first.");
    }
  },
  // Handle logout requests
  logout: (req, res) => {
    const sid = req.cookies.sid; // Retrieve session ID from cookies
    delete sessions[sid]; // Remove the session from the storage
    res.clearCookie("sid").redirect("/"); // Clear the session cookie and redirect to the home page
  }
};

// Export the UserController for use in server.js
module.exports = UserController;
