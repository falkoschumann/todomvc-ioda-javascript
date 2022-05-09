// @ts-check

import { useCallback, useEffect, useReducer } from 'react';

import {
  MemoryTodosRepository,
  handleAddTodoCommand,
  handleClearCompletedCommand,
  handleDestroyCommand,
  handleSaveCommand,
  handleSelectTodosQuery,
  handleToggleAllCommand,
  handleToggleCommand,
} from 'todos-backend';
import { AddTodoCommand } from 'todos-contract';

import { initialTodosState, todosReducer } from './components/todosReducer';
import TodoApp from './components/TodoApp';

const todosRepository = new MemoryTodosRepository();

function App() {
  const [state, dispatch] = useReducer(todosReducer, initialTodosState);

  const handleAddTodo = useCallback(async (title) => {
    await handleAddTodoCommand(todosRepository, new AddTodoCommand(title));
    const result = await handleSelectTodosQuery(todosRepository, {});
    dispatch({ type: 'TODO_ADDED', todos: result.todos });
  }, []);

  const handleCancel = useCallback(() => {
    dispatch({ type: 'CANCEL' });
  }, []);

  const handleClearCompleted = useCallback(async () => {
    await handleClearCompletedCommand(todosRepository, {});
    const result = await handleSelectTodosQuery(todosRepository, {});
    dispatch({ type: 'CLEARED_COMPLETED', todos: result.todos });
  }, []);

  const handleDestroy = useCallback(async (todoId) => {
    await handleDestroyCommand(todosRepository, { todoId });
    const result = await handleSelectTodosQuery(todosRepository, {});
    dispatch({ type: 'DESTROYED', todos: result.todos });
  }, []);

  const handleEdit = useCallback((todoId) => {
    dispatch({ type: 'EDIT', todoId });
  }, []);

  const handleSave = useCallback(async (todoId, newTitle) => {
    await handleSaveCommand(todosRepository, { todoId, newTitle });
    const result = await handleSelectTodosQuery(todosRepository, {});
    dispatch({ type: 'SAVED', todos: result.todos });
  }, []);

  const handleToggle = useCallback(async (todoId) => {
    await handleToggleCommand(todosRepository, { todoId });
    const result = await handleSelectTodosQuery(todosRepository, {});
    dispatch({ type: 'TOGGLED', todos: result.todos });
  }, []);

  const handleToggleAll = useCallback(async (checked) => {
    await handleToggleAllCommand(todosRepository, { checked });
    const result = await handleSelectTodosQuery(todosRepository, {});
    dispatch({ type: 'TOGGLED_ALL', todos: result.todos });
  }, []);

  useEffect(() => {
    async function loadTodos() {
      const result = await handleSelectTodosQuery(todosRepository, {});
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
