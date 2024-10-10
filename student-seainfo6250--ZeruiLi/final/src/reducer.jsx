import {
  LOGIN_STATUS,
  ACTIONS,
} from './constants';

export const initialState = {
  error: '',
  username: '',
  loginStatus: LOGIN_STATUS.PENDING,
  isTodoPending: false,
  todos: {},
  budget: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: '',
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
      };

    case ACTIONS.START_LOADING_TODOS:
      return {
        ...state,
        isTodoPending: true,
      };

    case ACTIONS.REPLACE_TODOS:
      return {
        ...state,
        isTodoPending: false,
        todos: action.todos,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        isTodoPending: false,
        todos: {},
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: '',
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.error || 'ERROR',
      };

    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.todo.id]: action.todo,
        },
      };

    case ACTIONS.UPDATE_TODO:
      const updatedTodos = {
        ...state.todos,
        [action.todo.id]: {
          ...state.todos[action.todo.id],
          ...action.todo,
        },
      };
      return {
        ...state,
        todos: updatedTodos,
      };

    case ACTIONS.DELETE_TODO:
      const todosCopy = { ...state.todos };
      delete todosCopy[action.id];
      return {
        ...state,
        todos: todosCopy,
      };
      case ACTIONS.SET_BUDGET:

      return {
        ...state,
        budget: action.budget,  
      };

    default:
      throw new Error('Unknown action type');
  }
}

export default reducer;
