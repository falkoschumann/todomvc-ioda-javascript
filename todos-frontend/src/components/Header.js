// @ts-check

/**
 * @typedef {import('react').ChangeEvent<HTMLInputElement>} InputChangeEvent
 * @typedef {import('react').KeyboardEvent} KeyboardEvent
 * @typedef {import('react').ReactElement} ReactElement
 */

/**
 * @param {object} props
 * @param {string} props.newTodo
 * @param {(title: string) => void} props.onAddTodo
 * @param {(title: string) => void} props.onUpdateNewTodo
 * @returns {ReactElement}
 */
function Header({ newTodo, onAddTodo, onUpdateNewTodo }) {
  /**
   * @param {InputChangeEvent} event
   */
  function handleChange(event) {
    onUpdateNewTodo(event.target.value);
  }

  /**
   * @param {KeyboardEvent} event
   */
  function handleNewTodoKeyDown(event) {
    if (event.code !== 'Enter') return;

    event.preventDefault();
    const text = newTodo.trim();
    if (text) {
      onAddTodo(text);
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onKeyDown={handleNewTodoKeyDown}
        onChange={handleChange}
        autoFocus
      />
    </header>
  );
}

export default Header;
