// @ts-check

import TodoItem from './TodoItem';

/**
 * @typedef {import('react').ChangeEvent<HTMLInputElement>} InputChangeEvent
 * @typedef {import('react').ReactElement} ReactElement
 */

/**
 * @typedef {import('./TodoItem').TodoId} TodoId
 * @typedef {import('./TodoItem').Todo} Todo
 */

/**
 * @param {object} props
 * @param {number} props.activeTodoCount
 * @param {TodoId} props.editing
 * @param {Todo[]} props.shownTodos
 * @param {Todo[]} props.todos
 * @param {() => void} props.onCancel
 * @param {(id: TodoId) => void} props.onDestroy
 * @param {(id: TodoId) => void} props.onEdit
 * @param {(id: TodoId, newTitle: string) => void} props.onSave
 * @param {(id: TodoId) => void} props.onToggle
 * @param {(checked: boolean) => void} props.onToggleAll
 * @returns {ReactElement}
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
  if (todos.length === 0) return null;

  /**
   * @param {InputChangeEvent} event
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
