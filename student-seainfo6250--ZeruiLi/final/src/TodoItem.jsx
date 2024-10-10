function TodoItem({
  todo,
  isLastAdded,
  onDeleteTodo
}) {
  const isAddedClass = isLastAdded ? "todo__text--added" : "";

  return (
    <>
      <span
        data-id={todo.id}
        className={`todo__text ${isAddedClass}`}
      >
        {todo.goods} - ${todo.price.toFixed(2)} - {todo.category} 
      </span>
      <button
        data-id={todo.id}
        className="todo__delete"
        onClick={(e) => {
          const id = e.target.dataset.id;
          onDeleteTodo(id);
        }}
      >
        &#10060;
      </button>
    </>
  );
}

export default TodoItem;
