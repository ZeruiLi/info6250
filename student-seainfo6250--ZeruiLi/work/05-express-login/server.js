// Import required modules
const express = require("express"); // Express framework for building web applications
const cookieParser = require("cookie-parser"); // Middleware to parse cookies attached to the client request object
const { v4: uuidv4 } = require("uuid"); // For generating unique identifiers, here for session IDs
const app = express(); // Create an Express application
const PORT = 3000; // Define the port number on which the server will listen

// Import the UserController that handles routes logic
const UserController = require("./controllers/UserController");

// Middleware
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(cookieParser()); // Parse cookies from the client requests
app.use(express.static("./public")); // Serve static files (e.g., CSS, JS, images) from the 'public' directory

// Routes
// Define route handlers for the application using UserController
app.get("/", UserController.index); // Handle GET requests to the root URL
app.post("/login", UserController.login); // Handle POST requests for user login
app.post("/add-word", UserController.addWord); // Handle POST requests to add a word
app.post("/logout", UserController.logout); // Handle POST requests for user logout

// Start the server
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)); // Listen on the defined PORT and log message to console
