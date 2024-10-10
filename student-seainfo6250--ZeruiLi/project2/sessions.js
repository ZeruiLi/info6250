"use strict"
const uuid = require('uuid').v4;

const sessions = {};

function setSession(username) {
    "use strict"
    const sid = uuid();
  sessions[sid] = { username };
  return sid;
}

function getUsername(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

const sessionModel = {
  setSession,
  getUsername,
  deleteSession,
};

module.exports = sessionModel;