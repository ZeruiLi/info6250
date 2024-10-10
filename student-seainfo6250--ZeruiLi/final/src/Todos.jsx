import Loading from './Loading';
import TodoItem from './TodoItem';

function Todos({
  todos,
  isTodoPending,
  lastAddedTodoId,
  onDeleteTodo
}) {
  const SHOW = {
    PENDING: 'pending',
    EMPTY: 'empty',
    TODOS: 'todos',
  };

  let show;
  if(isTodoPending) {
    show = SHOW.PENDING;
  } else if (!Object.keys(todos).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.TODOS;
  }

  const calculateTotalPrice = () => {
    return Object.values(todos).reduce((total, todo) => total + todo.price, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="content">
      { show === SHOW.PENDING && <Loading className="todos__waiting">Loading lists...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No goods yet, add one!</p>
      )}
      { show === SHOW.TODOS && (
        <>
          <ul className="todos">
            { Object.values(todos).map(todo => (
              <li className="todo" key={todo.id}>
                <TodoItem
                  todo={todo}
                  isLastAdded={lastAddedTodoId === todo.id}
                  onDeleteTodo={onDeleteTodo}
                />
              </li>
            ))}
          </ul>
          <div className="total-price">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}

export default Todos;
