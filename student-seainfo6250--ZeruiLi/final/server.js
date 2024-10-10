const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const todos = require('./todos');  
const sessions = require('./sessions');
const users = require('./users');
const budgets = require('./budgets');
app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());


app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if (username === "dog") {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.addUserData(username, todos.makeTodoList());  
  }
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getTodos());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    sessions.deleteSession(sid);
  }
  res.json({ username });
});


app.get('/api/todos', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getTodos());
});

app.post('/api/todos', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { goods, price,category } = req.body;
  if(!goods || price === undefined) {
    res.status(400).json({ error: 'required-goods-and-price' });
    return;
  }
  const todoList = users.getUserData(username);
  const id = todoList.addTodo({
    goods: goods,
    price: parseFloat(price), 
    category
  });
  res.json(todoList.getTodo(id));
});

app.get('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  res.json(todoList.getTodo(id));
});

app.put('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  const { goods, price,category } = req.body;
  if(!goods || price === undefined) {
    res.status(400).json({ error: 'required-goods-and-price' });
    return;
  }
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todoList.updateTodo(id, { goods, price: parseFloat(price),category });
  res.json(todoList.getTodo(id));
});

app.patch('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { goods, price,category } = req.body;
  const todoList = users.getUserData(username);
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todoList.updateTodo(id, { goods, price: parseFloat(price),category });
  res.json(todoList.getTodo(id));
});

app.delete('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const todoList = users.getUserData(username);
  const exists = todoList.contains(id);
  if(exists) {
    todoList.deleteTodo(id);
  }
  res.json({ message: exists ? `todo ${id} deleted` : `todo ${id} did not exist` });
});
app.post('/api/budget', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { budget } = req.body;
  if (budget === undefined || isNaN(parseFloat(budget))) {
    res.status(400).json({ error: 'required-budget' });
    return;
  }
  budgets.setBudget(username, parseFloat(budget));
  console.log();
  res.json({ message: 'Budget set successfully.', budget: budgets.getBudget(username) });
});
app.get('/api/budget', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const budget = budgets.getBudget(username);
  if (budget === undefined) {
    res.status(404).json({ error: 'no-budget-set' });
  } else {
    res.json({ budget: budget });
  }
});



app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

