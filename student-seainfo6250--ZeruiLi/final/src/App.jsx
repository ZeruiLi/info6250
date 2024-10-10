import { useEffect, useReducer } from 'react';
import BudgetForm from './BudgetForm'; 
import './App.css';
import reducer, { initialState } from './reducer';
import CategoryData from './CategoryData';
import {
  LOGIN_STATUS,
  ACTIONS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchTodos,
  fetchDeleteTodo,
  fetchAddTodo,
  fetchSetBudget,
} from './services';

import LoginForm from './LoginForm';
import Todos from './Todos';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddTodoForm from './AddTodoForm';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const calculateTotalPrice = () => {
    return Object.values(state.todos).reduce((total, todo) => total + todo.price, 0);
  };

  const totalPrice = calculateTotalPrice();
  const remainingBudget = state.budget ? parseFloat( state.budget) - totalPrice : 0;  

  function onLogin(username) {
    dispatch({ type: ACTIONS.START_LOADING_TODOS });
    fetchLogin(username)
    .then(fetchedTodos => {
      dispatch({ type: ACTIONS.LOG_IN, username });
      dispatch({ type: ACTIONS.REPLACE_TODOS, todos: fetchedTodos });

      return fetch('/api/budget', { method: 'GET' });
    })
    .then(response => response.json())
    .then(data => {

      dispatch({ type: ACTIONS.SET_BUDGET, budget: data.budget });
    })
    .catch(err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }


  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    dispatch({ type: ACTIONS.SET_BUDGET, budget: 0 }); 
    fetchLogout()
    .catch(err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }


  function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_TODOS });
    fetchTodos()
    .then(todos => {
      dispatch({ type: ACTIONS.REPLACE_TODOS, todos });
    })
    .catch(err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  const handleSetBudget = (newBudget) => {
    fetchSetBudget(newBudget)
    .then(() => {
      dispatch({ type: ACTIONS.SET_BUDGET, budget: newBudget }); 
    })
      .catch(error => {
        console.error('Error setting budget:', error);
      });
  };

  function onDeleteTodo(id) {
    dispatch({ type: ACTIONS.START_LOADING_TODOS });
    fetchDeleteTodo(id)
      .then(() => {
        return fetchTodos(); 
      })
      .then(todos => {
        dispatch({ type: ACTIONS.REPLACE_TODOS, todos });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onAddTodo(todo) {
    fetchAddTodo(todo)
      .then(addedTodo => {
        dispatch({ type: ACTIONS.ADD_TODO, todo: addedTodo });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function checkForSession() {
    fetchSession()
    .then(session => {
      if (session.username) {
        dispatch({ type: ACTIONS.LOG_IN, username: session.username });
        return fetchTodos();  
      } else {
        throw new Error(CLIENT.NO_SESSION);  
      }
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      return Promise.reject(err); 
    })
    .then(todos => {
      dispatch({ type: ACTIONS.REPLACE_TODOS, todos });
      return fetch('/api/budget', { method: 'GET' });  
    })
     .then(response => response.json())
    .then(data => {
      dispatch({ type: ACTIONS.SET_BUDGET, budget: data.budget });  
    })
    .catch(err => {
      if (err?.error === CLIENT.NO_SESSION) {
        dispatch({ type: ACTIONS.LOG_OUT });
      } else {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error || 'Error fetching session or data' });
      }
    });
}


  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>SpendSmart</h1>
      </header>
      <main>
        <div className="left-panel">
          {state.loginStatus === LOGIN_STATUS.PENDING && <Loading />}
          {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
          {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
            <>
              <p>Hello, {state.username}</p>
              <Controls onLogout={onLogout} onRefresh={onRefresh} />
              <BudgetForm onSetBudget={handleSetBudget} />
              <p>Current Budget: ${state.budget.toFixed(2)}</p>
              {state.budget === 0 ? (
                <p>You have not set any budget. Please enter your budget.</p>
              ) : (
                remainingBudget >= 0 ? (
                  <p>Your remaining budget is ${remainingBudget.toFixed(2)}. Please continue your spending.</p>
                ) : (
                  <p>You have exceeded your budget by ${(-remainingBudget).toFixed(2)}. Please spend wisely.</p>
                )
              )}
              <Todos
                isTodoPending={state.isTodoPending}
                todos={state.todos}
                onDeleteTodo={onDeleteTodo}
                onAddTodo={onAddTodo}
              />
              <AddTodoForm onAddTodo={onAddTodo} />
            </>
          )}
          {state.error && <Status error={state.error} />}
        </div>
        
        <div className="right-panel">
        {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN ? (
            
            <img 
            src="/budget.jpg" 
            alt="Spend Smartly with SpendSmart" 
            className="right-panel-image" 
          />
          ) : (
            
            <CategoryData todos={Object.values(state.todos)} />
          )}
          </div>
      </main>
      <footer className="footer">
        © 2024 SpendSmart. All rights reserved.
      </footer>
    </div>
  );
  
 }



export default App;
