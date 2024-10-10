"use strict"
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

const sessions = require("./sessions");
const models = require("./models");

app.get("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUsername(sid) : "";
  if (!sid || !models.isValidUser(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json({ username });
});

app.post("/api/v1/session", (req, res) => {
  const username = req.body.username.trim();

  if (!models.isValidUser(username)) {
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  const sid = sessions.setSession(username);
  models.registerUser(username);
  models.addLoginUser(username);

  res.cookie("sid", sid);
  res.json(models.getLoginUsers());
});

app.delete("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUsername(sid) : "";

  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    sessions.deleteSession(sid);
    models.removeLoginUser(username);
  }

  res.json({ username });
});

app.get("/api/v1/users", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUsername(sid) : "";
  if (!sid || !models.isValidUser(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  res.json(models.getLoginUsers());
});

app.get("/api/v1/messages", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUsername(sid) : "";
  if (!sid || !models.isValidUser(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  res.json(models.getMessages());
});

app.post("/api/v1/messages", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUsername(sid) : "";
  if (!sid || !models.isValidUser(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const message = req.body.message.trim();
  if (!message) {
    res.status(400).json({ error: "required-message" });
    return;
  }
  const record = {
    sender: username,
    text: message,
  };

  models.addMessage(record);

  res.json(models.getMessages());
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));