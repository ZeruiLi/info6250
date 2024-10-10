// Define a function to validate a username
const validateUserName = (username) => {
  // Regular expression to match only alphanumeric characters
  const regex = /^[a-zA-Z0-9]+$/;

  // Check if username is provided and not just whitespace
  if (!username || username.trim().length === 0) {
    // Return false with an error message if username is missing
    return [false, "Username is required"];
  }

  // Use the regex to test the username for alphanumeric characters
  if (!regex.test(username)) {
    // Return false with an error message if username contains non-alphanumeric characters
    return [false, "Username must consist of letters and numbers only"];
  }

  // Check if the username is specifically "dog" (case-insensitive)
  if (username.toLowerCase() === "dog") {
    // Return false with an error message if username is "dog"
    return [false, "Username 'dog' is not allowed"];
  }

  // If all checks pass, return true with an empty message indicating the username is valid
  return [true, ""]; // Username is valid
};

// Export the validateUserName function for use in other files
module.exports = {
validateUserName
};
