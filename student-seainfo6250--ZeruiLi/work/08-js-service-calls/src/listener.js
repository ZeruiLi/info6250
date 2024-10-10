"use strict"

import { fetchLogin, fetchLogout, fetchUpdateWord, fetchWord } from "./services";
import render from "./render";
import { login, logout, setError, setWord } from "./state";
import { CLIENT, SERVER, MESSAGES } from './constants';

export function addLoginListener({ state, appEl }) {
  appEl.addEventListener("submit", (e) => handleLoginSubmit(e, { state, appEl }));
}

function handleLoginSubmit(e, { state, appEl }) {
  e.preventDefault();
  if (!e.target.classList.contains("login-form")) return;
  const username = appEl.querySelector(".login-username").value;
  fetchLogin(username)
    .then(({ username }) => handleLoginSuccess({ username, state, appEl }))
    .catch((err) => handleError(err, { state, appEl }));
}

function handleLoginSuccess({ username, state, appEl }) {
  login(username);
  render({ state, appEl });
  fetchWord()
    .then((response) => handleFetchWordSuccess(response, { state, appEl }))
    .catch((err) => handleFetchWordError(err, { state, appEl }));
}

function handleFetchWordSuccess(response, { state, appEl }) {
  setWord(response.storedWord);
  render({ state, appEl });
}

function handleFetchWordError(err, { state, appEl }) {
  if (err?.error === SERVER.AUTH_MISSING) {
    handleError({ error: CLIENT.NO_SESSION }, { state, appEl });
    return;
  }
  handleError(err, { state, appEl });
}

export function addLogoutListener({ state, appEl }) {
  appEl.addEventListener("submit", (e) => handleLogoutSubmit(e, { state, appEl }));
}

function handleLogoutSubmit(e, { state, appEl }) {
  e.preventDefault();
  if (!e.target.classList.contains("logout-form")) return;
  logout();
  render({ state, appEl });
  fetchLogout().catch((err) => handleError(err, { state, appEl }));
}

export function addWordListenser({ state, appEl }) {
  appEl.addEventListener("submit", (e) => handleWordSubmit(e, { state, appEl }));
}

function handleWordSubmit(e, { state, appEl }) {
  e.preventDefault();
  if (!e.target.classList.contains("word-form")) return;
  const word = appEl.querySelector(".word-input").value;
  fetchUpdateWord(word)
    .then(({ storedWord }) => handleUpdateWordSuccess({ storedWord, state, appEl }))
    .catch((err) => handleError(err, { state, appEl }));
}

function handleUpdateWordSuccess({ storedWord, state, appEl }) {
  setWord(storedWord);
  render({ state, appEl });
}

function handleError(err, { state, appEl }) {
  const error = err?.error || 'ERROR';
  const message = MESSAGES[error] || MESSAGES.default;
  setError(message);
  render({ state, appEl });
}