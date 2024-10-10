"use strict"
import { fetchLogin, fetchLogout, fetchPostMessage } from "./services";
import render from "./render";
import { login, logout, setError, setMessages, waitOnChat } from "./state";

export function addLoginListener({ state, appEl, chatEl }) {
  appEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("login-form")) {
      return;
    }

    const username = appEl.querySelector(".login-username").value;
    waitOnChat();
    render({ state, appEl, chatEl });
    fetchLogin(username)
      .then(() => {
        login(username);
        render({ state, appEl, chatEl });
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
        render({ state, appEl, chatEl });
      });
  });
}

export function addLogoutListener({ state, appEl, chatEl }) {
  appEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("logout-form")) {
      return;
    }

    logout();
    render({ state, appEl, chatEl });
    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
      render({ state, appEl, chatEl });
    });
  });
}

export function addPostMessageListener({ state, appEl, chatEl }) {
  appEl.addEventListener("submit", (e) => {
    if (!e.target.classList.contains("chat-form")) {
      return;
    }
    let message = appEl.querySelector(".message").value;
    fetchPostMessage(message)
      .then((messages) => {
        setMessages(messages);
        render({ state, appEl, chatEl });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.error || "ERROR");
        render({ state, appEl, chatEl });
      });
  });
}