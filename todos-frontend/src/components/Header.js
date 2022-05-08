// @ts-check

import { useState } from 'react';

/**
 * @param {{
 *     onAddTodo(title: string): void,
 * }} props
 */
function Header({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState('');

  /**
   * @param {import('react').ChangeEvent<HTMLInputElement>} event
   */
  function handleChange(event) {
    setNewTodo(event.target.value);
  }

  /**
   * @param {import('react').KeyboardEvent} event
   */
  function handleNewTodoKeyDown(event) {
    if (event.code !== 'Enter') return;

    event.preventDefault();
    const text = newTodo.trim();
    if (text) {
      setNewTodo('');
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
        onChange={handleChange}
        onKeyDown={handleNewTodoKeyDown}
        autoFocus
      />
    </header>
  );
}

export default Header;
