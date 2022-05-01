// @ts-check

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';

/**
 * @typedef {import('react').ReactElement} ReactElement
 */

/**
 * @typedef {import('./utils').Filter} Filter
 * @typedef {import('./TodoItem').TodoId} TodoId
 * @typedef {import('./TodoItem').Todo} Todo
 */

/**
 * @param {object} props
 * @param {number} props.activeTodoCount
 * @param {number} props.completedCount
 * @param {TodoId} props.editing
 * @param {string} props.newTodo
 * @param {Filter} props.nowShowing
 * @param {Todo[]} props.shownTodos
 * @param {Todo[]} props.todos
 * @param {(title: string) => void} props.onAddTodo
 * @param {() => void} props.onCancel
 * @param {() => void} props.onClearCompleted
 * @param {(id: TodoId) => void} props.onDestroy
 * @param {(id: TodoId) => void} props.onEdit
 * @param {(pathname: string) => void} props.onLocationChanged
 * @param {(id: TodoId, newTitle: string) => void} props.onSave
 * @param {(id: TodoId) => void} props.onToggle
 * @param {(checked: boolean) => void} props.onToggleAll
 * @param {(title: string) => void} props.onUpdateNewTodo
 * @returns {ReactElement}
 */
function TodoApp({
  activeTodoCount,
  completedCount,
  editing,
  newTodo,
  nowShowing,
  shownTodos,
  todos,
  onAddTodo,
  onCancel,
  onClearCompleted,
  onDestroy,
  onEdit,
  onLocationChanged,
  onSave,
  onToggle,
  onToggleAll,
  onUpdateNewTodo,
}) {
  const { pathname } = useLocation();
  useEffect(() => onLocationChanged(pathname), [pathname, onLocationChanged]);

  return (
    <>
      <section className="todoapp">
        <Header newTodo={newTodo} onUpdateNewTodo={onUpdateNewTodo} onAddTodo={onAddTodo} />
        <Main
          shownTodos={shownTodos}
          todos={todos}
          editing={editing}
          activeTodoCount={activeTodoCount}
          onToggle={onToggle}
          onDestroy={onDestroy}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onToggleAll={onToggleAll}
        />
        <Footer
          activeTodoCount={activeTodoCount}
          completedCount={completedCount}
          nowShowing={nowShowing}
          onClearCompleted={onClearCompleted}
        />
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
      </footer>
    </>
  );
}

export default TodoApp;
