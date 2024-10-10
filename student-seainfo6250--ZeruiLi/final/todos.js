const uuid = require('uuid').v4;

function makeTodoList() {
  const id1 = uuid();
  const id2 = uuid();

  const todoList = {};
  const todos = {
    [id1]: {
      id: id1,
      goods: 'beef',
      price: 50,  
      category: 'foods',
    },
    [id2]: {
      id: id2,
      goods: 'beer',
      price: 100,  
      category: 'drinks',
    },
  };

  todoList.contains = function contains(id) {
    return !!todos[id];
  };

  todoList.getTodos = function getTodos() {
    return todos;
  };

  todoList.addTodo = function addTodo({ goods, price,category }) {
    const id = uuid();
    todos[id] = {
      id,
      goods,
      price: parseFloat(price) || 0,  
      category,
    };
    return id;
  };

  todoList.getTodo = function getTodo(id) {
    return todos[id];
  };

  todoList.updateTodo = function updateTodo(id, { goods, price,category }) {
    if (goods !== undefined) {
      todos[id].goods = goods;
    }
    if (price !== undefined) {
      todos[id].price = parseFloat(price) || 0;  
    }
    if (category !== undefined) {
      todos[id].category = category;
    }
  };

  todoList.deleteTodo = function deleteTodo(id) {
    delete todos[id];
  };

  return todoList;
};

module.exports = {
  makeTodoList,
};
