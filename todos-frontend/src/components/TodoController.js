// @ts-check

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  AddTodoCommand,
  ClearCompletedCommand,
  DestroyCommand,
  SaveCommand,
  SelectTodosQuery,
  ToggleAllCommand,
  ToggleCommand,
} from 'todos-contract';

import { Filter } from './data';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';

/**
 * @param {{
 *     selectTodosQueryResult: import('todos-contract').SelectTodosQueryResult,
 *     onAddTodoCommand(c: import('todos-contract').AddTodoCommand): void,
 *     onClearCompletedCommand(c: import('todos-contract').ClearCompletedCommand): void,
 *     onDestroyCommand(c: import('todos-contract').DestroyCommand): void,
 *     onSaveCommand(c: import('todos-contract').SaveCommand): void,
 *     onSelectTodosQuery(c: import('todos-contract').SelectTodosQuery): void,
 *     onToggleCommand(c: import('todos-contract').ToggleCommand): void,
 *     onToggleAllCommand(c: import('todos-contract').ToggleAllCommand): void,
 * }} props
 */
function TodoController({
  selectTodosQueryResult,
  onAddTodoCommand,
  onClearCompletedCommand,
  onDestroyCommand,
  onSaveCommand,
  onSelectTodosQuery,
  onToggleCommand,
  onToggleAllCommand,
}) {
  const { pathname } = useLocation();
  const [editing, setEditing] = useState();

  function handleAddTodo(title) {
    onAddTodoCommand(new AddTodoCommand(title));
  }

  function handleClearCompleted() {
    onClearCompletedCommand(new ClearCompletedCommand());
  }

  function handleDestroy(todoId) {
    onDestroyCommand(new DestroyCommand(todoId));
  }

  function handleCancel() {
    setEditing(null);
  }

  function handleEdit(todoId) {
    setEditing(todoId);
  }

  function handleSave(todoId, newTitle) {
    onSaveCommand(new SaveCommand(todoId, newTitle));
    setEditing(null);
  }

  function handleToggle(todoId) {
    onToggleCommand(new ToggleCommand(todoId));
  }

  function handleToggleAll(checked) {
    onToggleAllCommand(new ToggleAllCommand(checked));
  }

  useEffect(() => {
    onSelectTodosQuery(new SelectTodosQuery());
  }, [onSelectTodosQuery]);

  /**
   * @param {string} pathname
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
    /**
     * @param {import('todos-contract').Todo} todo
     */
    function matchFilter(todo) {
      switch (filter) {
        case Filter.ACTIVE_TODOS:
          return !todo.completed;
        case Filter.COMPLETED_TODOS:
          return todo.completed;
        case Filter.ALL_TODOS:
        default:
          return true;
      }
    }

    return selectTodosQueryResult.todos.filter(matchFilter);
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
  const { activeTodoCount, completedCount } = countTodos(selectTodosQueryResult.todos);

  return (
    <>
      <section className="todoapp">
        <Header onAddTodo={handleAddTodo} />
        <Main
          activeTodoCount={activeTodoCount}
          editing={editing}
          shownTodos={shownTodos}
          todos={selectTodosQueryResult.todos}
          onCancel={handleCancel}
          onDestroy={handleDestroy}
          onEdit={handleEdit}
          onSave={handleSave}
          onToggle={handleToggle}
          onToggleAll={handleToggleAll}
        />
        <Footer
          activeTodoCount={activeTodoCount}
          completedCount={completedCount}
          nowShowing={nowShowing}
          onClearCompleted={handleClearCompleted}
        />
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
      </footer>
    </>
  );
}

export default TodoController;
