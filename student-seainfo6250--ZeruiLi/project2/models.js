"use strict"
let users = {};
let loginUsers = {};
let messages = [
  { sender: "Amit", text: "You up?" },
  { sender: "Bao", text: "Good" },
];

function isValidUser(username) {
  return username && username.match(/^[A-Za-z0-9_]+$/);
}

function registerUser(username) {
  if (isValidUser(username)) {
    users[username] = username;
  }
}

function addLoginUser(username) {
  if (isValidUser(username)) {
    loginUsers[username] = username;
  }
}

function removeLoginUser(username) {
  delete loginUsers[username];
}

function getLoginUsers() {
  return loginUsers;
}

function addMessage(message) {
  messages.push(message);
}

function getMessages() {
  return messages;
}

module.exports = {
  isValidUser,
  registerUser,
  addLoginUser,
  removeLoginUser,
  getLoginUsers,
  addMessage,
  getMessages,
};