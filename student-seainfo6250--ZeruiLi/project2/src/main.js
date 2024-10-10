"use strict"
import render from "./render";
import state, { login, logout, setLoginUsers, setMessages, setError, waitOnLogin } from "./state";
import { addLoginListener, addLogoutListener, addPostMessageListener } from "./listeners";
import { fetchSession, fetchLoginUsers, fetchMessages } from "./services";
import { SERVER, CLIENT } from "./constants";

const appEl = document.querySelector("#app");
const chatEl = document.querySelector("#chat");
render({ state, appEl, chatEl });
addLoginListener({ state, appEl, chatEl });
addLogoutListener({ state, appEl, chatEl });
addPostMessageListener({ state, appEl, chatEl });
checkForSession();
pollData();

function pollData() {
  refreshData();
  setTimeout(pollData, 5000);
}

function refreshData() {
  if (!state.isLoggedIn) {
    return;
  }
  fetchLoginUsers()
    .then((users) => {
      setLoginUsers(users);
      return fetchMessages();
    })
    .catch((err) => Promise.reject(err))
    .then((messages) => {
      setMessages(messages);
      render({ state, appEl, chatEl });
    })
    .catch((err) => {
      setError(err?.error || "ERROR");
      render({ state, appEl, chatEl });
    });
}

function checkForSession() {
  fetchSession()
    .then((session) => {
      login(session.username);
      render({ state, appEl, chatEl });
      return fetchLoginUsers();
    })
    .catch((err) => {
      if (err?.error === SERVER.AUTH_MISSING) {
        return Promise.reject({ error: CLIENT.NO_SESSION });
      }
      return Promise.reject(err);
    })
    .then((users) => {
      setLoginUsers(users);
      return fetchMessages();
    })
    .catch((err) => {
      if (err?.error === CLIENT.NO_SESSION) {
        logout();
        render({ state, appEl, chatEl });
        return Promise.reject(err);
      }
      setError(err?.error || "ERROR");
      render({ state, appEl, chatEl });
      return Promise.reject(err);
    });
}
