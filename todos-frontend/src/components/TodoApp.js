// @ts-check

import { useLocation } from 'react-router-dom';

import { Filter } from './utils';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

/**
 * @param {{
 *     editing: import('todos-contract').TodoId,
 *     todos: import('todos-contract').Todo[],
 *     onAddTodo(title: string): void,
 *     onCancel(): void,
 *     onClearCompleted(): void,
 *     onDestroy(id: import('todos-contract').TodoId): void,
 *     onEdit(id: import('todos-contract').TodoId): void,
 *     onSave(id: import('todos-contract').TodoId, newTitle: string): void,
 *     onToggle(id: import('todos-contract').TodoId): void,
 *     onToggleAll(checked: boolean): void,
 * }} props
 */
function TodoApp({
  editing,
  todos,
  onAddTodo,
  onCancel,
  onClearCompleted,
  onDestroy,
  onEdit,
  onSave,
  onToggle,
  onToggleAll,
}) {
  const { pathname } = useLocation();

  /**
   * @param {string} pathname
   * @returns {Filter}
   */
  function determineFilter(pathname) {
    switch (pathname) {
      case '/active':
        return Filter.ACTIVE_TODOS;
      case '/completed':
        return Filter.COMPLETED_TODOS;
      default:
        return Filter.ALL_TODOS;
    }
  }

  /**
   * @param {Filter} filter
   */
  function determineShownTodos(filter) {
    return todos.filter((todo) => {
      switch (filter) {
        case Filter.ACTIVE_TODOS:
          return !todo.completed;
        case Filter.COMPLETED_TODOS:
          return todo.completed;
        case Filter.ALL_TODOS:
        default:
          return true;
      }
    });
  }

  /**
   * @param {import('todos-contract').Todo[]} todos

   */
  function countTodos(todos) {
    const activeTodoCount = todos.reduce((count, todo) => {
      return todo.completed ? count : count + 1;
    }, 0);
    const completedCount = todos.length - activeTodoCount;
    return { activeTodoCount, completedCount };
  }

  const nowShowing = determineFilter(pathname);
  const shownTodos = determineShownTodos(nowShowing);
  const { activeTodoCount, completedCount } = countTodos(todos);
  return (
    <>
      <section className="todoapp">
        <Header onAddTodo={onAddTodo} />
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
