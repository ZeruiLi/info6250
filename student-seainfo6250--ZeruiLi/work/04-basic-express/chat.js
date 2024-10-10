const users = [
  { username: "Amit", fullName: "Amit", online: true },
  { username: "Bao", fullName: "Bao", online: false }
];




const messages = [ 
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];


// Define a function to add a new message to the messages array
// Accepts an object with sender and text properties
function addMessage({ sender, text }) { 
  messages.push({ sender, text });
}

// Create a chat object that encapsulates the users, messages, and the addMessage function
const chat = {
  users,
  messages,
  addMessage,
};

// Export the chat object so it can be required in other files
module.exports = chat;

