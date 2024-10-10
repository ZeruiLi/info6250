// Function to generate dynamic HTML content
const generateHTML = (title, message, form, link = "") => {
  // Returns a template string with placeholders filled with parameters
  return `
    <link rel="stylesheet" href="/style.css" /> <!-- Link to stylesheet -->
    <h2>${title}</h2> <!-- Display the title -->
    <p>${message}</p> <!-- Display a message -->
    ${form} <!-- Insert a form (HTML string) -->
    ${link} <!-- Optionally include a link -->
  `;
};

// Function to create a login form HTML string
const loginForm = () => {
  // Returns a form for user login
  return `<form method="POST" action="/login">
            <label>Username : </label><input type="text" name="username">
            <button type="submit">Login</button>
          </form>`;
};

// Function to create an add word form HTML string
const addWordForm = () => {
  // Returns a form for adding a word
  return `<form method="POST" action="/add-word">
            <label>Add Your Word : </label>
            <input type="text" name="word" placeholder="Enter the word">
            <button type="submit">Add Word</button>
          </form>`;
};

// Function to create a logout form HTML string
const logoutForm = () => {
  // Returns a form for user logout
  return `<form method="POST" action="/logout" class="logout-form">
            <button type="submit">Logout</button>
          </form>`;
};

// Function to create a retry login button HTML string
const retryLoginButton = () => {
  // Returns a button to retry login
  return `<form method="GET" action="/"><button type="submit">Try Again</button></form>`;
};

// Export functions for use in other parts of the application
module.exports = {
  generateHTML,
  loginForm,
  addWordForm,
  logoutForm,
  retryLoginButton
};
