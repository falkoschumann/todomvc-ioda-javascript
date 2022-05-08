// @ts-check

import TodoItem from './TodoItem';

/**
 * @param {{
 *     activeTodoCount: number,
 *     editing: import('todos-contract').TodoId,
 *     shownTodos: import('todos-contract').Todo[],
 *     todos: import('todos-contract').Todo[],
 *     onCancel(): void,
 *     onDestroy(id: import('todos-contract').TodoId): void,
 *     onEdit(id: import('todos-contract').TodoId): void,
 *     onSave(id: import('todos-contract').TodoId, newTitle: string): void,
 *     onToggle(id: import('todos-contract').TodoId): void,
 *     onToggleAll(checked: boolean): void,
 * }} props
 */
function Main({
  activeTodoCount,
  editing,
  shownTodos,
  todos,
  onCancel,
  onDestroy,
  onEdit,
  onSave,
  onToggle,
  onToggleAll,
}) {
  if (todos.length === 0) {
    return null;
  }

  /**
   * @param {import('react').ChangeEvent<HTMLInputElement>} event
   */
  function handleToggleAll(event) {
    onToggleAll(event.target.checked);
  }

  const todoItems = shownTodos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onToggle={() => onToggle(todo.id)}
      onDestroy={() => onDestroy(todo.id)}
      onEdit={() => onEdit(todo.id)}
      editing={editing === todo.id}
      onSave={(newTitle) => onSave(todo.id, newTitle)}
      onCancel={onCancel}
    />
  ));

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={handleToggleAll}
        checked={activeTodoCount === 0}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">{todoItems}</ul>
    </section>
  );
}

export default Main;
