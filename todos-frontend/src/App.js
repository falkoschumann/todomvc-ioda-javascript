// @ts-check

import { useCallback, useEffect, useReducer } from 'react';

import {
  MemoryTodosRepository,
  addTodo,
  clearCompleted,
  destroy,
  save,
  selectTodos,
  toggle,
  toggleAll,
} from 'todos-backend';
import { AddTodoCommand } from 'todos-contract';

import { initialTodosState, todosReducer } from './components/todosReducer';
import TodoApp from './components/TodoApp';

const todosRepository = new MemoryTodosRepository();

function App() {
  // TODO Replace reducer with state selectTodosQueryResult
  const [state, dispatch] = useReducer(todosReducer, initialTodosState);

  const handleAddTodo = useCallback(async (title) => {
    await addTodo(todosRepository, new AddTodoCommand(title));
    const result = await selectTodos(todosRepository, {});
    dispatch({ type: 'TODO_ADDED', todos: result.todos });
  }, []);

  const handleCancel = useCallback(() => {
    dispatch({ type: 'CANCEL' });
  }, []);

  const handleClearCompleted = useCallback(async () => {
    await clearCompleted(todosRepository, {});
    const result = await selectTodos(todosRepository, {});
    dispatch({ type: 'CLEARED_COMPLETED', todos: result.todos });
  }, []);

  const handleDestroy = useCallback(async (todoId) => {
    await destroy(todosRepository, { todoId });
    const result = await selectTodos(todosRepository, {});
    dispatch({ type: 'DESTROYED', todos: result.todos });
  }, []);

  const handleEdit = useCallback((todoId) => {
    dispatch({ type: 'EDIT', todoId });
  }, []);

  const handleSave = useCallback(async (todoId, newTitle) => {
    await save(todosRepository, { todoId, newTitle });
    const result = await selectTodos(todosRepository, {});
    dispatch({ type: 'SAVED', todos: result.todos });
  }, []);

  const handleToggle = useCallback(async (todoId) => {
    await toggle(todosRepository, { todoId });
    const result = await selectTodos(todosRepository, {});
    dispatch({ type: 'TOGGLED', todos: result.todos });
  }, []);

  const handleToggleAll = useCallback(async (checked) => {
    await toggleAll(todosRepository, { checked });
    const result = await selectTodos(todosRepository, {});
    dispatch({ type: 'TOGGLED_ALL', todos: result.todos });
  }, []);

  useEffect(() => {
    async function loadTodos() {
      const result = await selectTodos(todosRepository, {});
      dispatch({ type: 'TODOS_LOADED', todos: result.todos });
    }

    loadTodos();
  }, []);

  return (
    <TodoApp
      editing={state.editing}
      todos={state.todos}
      onAddTodo={handleAddTodo}
      onCancel={handleCancel}
      onClearCompleted={handleClearCompleted}
      onDestroy={handleDestroy}
      onEdit={handleEdit}
      onSave={handleSave}
      onToggle={handleToggle}
      onToggleAll={handleToggleAll}
    />
  );
}

export default App;
