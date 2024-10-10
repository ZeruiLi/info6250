// Require the express module to set up the web server
const express = require('express');
// Create an instance of an express application
const app = express();
// Define the port number on which the server will listen
const PORT = 3000;

// Require custom modules for chat logic and web interface generation
const chat = require('./chat'); // Module for handling chat logic (e.g., managing users/messages)
const chatWeb = require('./chat-web'); // Module for generating HTML content for the chat interface

// Serve static files from the 'public' directory
app.use(express.static('./public'));

// Route for the home page: Generates and sends the chat page as HTML
app.get('/', (req, res) => {
  res.send(chatWeb.chatPage(chat));
});

// Route for handling POST requests to '/chat': Processes new message submissions
app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {
  const { username, text } = req.body; // Extract the text of the message from the request body
  chat.addMessage({ sender: username, text }); // Add the message as being sent by "Bao"
  res.redirect('/'); // Redirect back to the home page after submitting the message
});

// Start the server and listen on the specified PORT
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
