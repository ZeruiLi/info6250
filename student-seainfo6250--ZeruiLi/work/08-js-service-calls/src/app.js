"use strict"

import state, { login, logout, setWord, setError } from './state'
import { fetchSession, fetchWord } from "./services";
import { CLIENT, MESSAGES } from './constants';
import render from "./render";
import { addLoginListener, addLogoutListener, addWordListenser } from './listener';

const appEl = document.querySelector('#app');

function initApp() {
  render({ state, appEl });
  addLoginListener({ state, appEl });
  addLogoutListener({ state, appEl });
  addWordListenser({ state, appEl });
  checkSession();
}

function checkSession() {
  fetchSession()
    .then(handleSessionSuccess)
    .catch(handleSessionError);
}

function handleSessionSuccess(session) {
  login(session.username);
  render({ state, appEl });
  fetchWord()
    .then(handleWordSuccess)
    .catch(handleError);
}

function handleSessionError(err) {
  handleError(err);
}

function handleWordSuccess(response) {
  setWord(response.storedWord);
  render({ state, appEl });
}

function handleError(err) {
  const error = err?.error || 'ERROR';
  const message = MESSAGES[error] || MESSAGES.default;

  if (error === CLIENT.NO_SESSION) {
    logout();
  } else {
    setError(message);
  }

  render({ state, appEl });
}

initApp();