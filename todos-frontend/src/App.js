// @ts-check

import { useCallback, useState } from 'react';

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

import TodoController from './components/TodoController';

const todosRepository = new MemoryTodosRepository();
const handleAddTodo = (c) => addTodo(todosRepository, c);
const handleClearCompleted = (c) => clearCompleted(todosRepository, c);
const handleDestroy = (c) => destroy(todosRepository, c);
const handleSave = (c) => save(todosRepository, c);
const handleSelectTodos = (q) => selectTodos(todosRepository, q);
const handleToggle = (c) => toggle(todosRepository, c);
const handleToggleAll = (c) => toggleAll(todosRepository, c);

function App() {
  const [selectTodosQueryResult, setSelectTodosQueryResult] = useState({ todos: [] });

  const handleAddTodoCommand = useCallback(async (c) => {
    await handleAddTodo(c);
    const result = await handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleClearCompletedCommand = useCallback(async (c) => {
    await handleClearCompleted(c);
    const result = await handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleDestroyCommand = useCallback(async (c) => {
    await handleDestroy(c);
    const result = await handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleSaveCommand = useCallback(async (c) => {
    await handleSave(c);
    const result = await handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleSelectTodosQuery = useCallback(async (c) => {
    const result = await handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleToggleCommand = useCallback(async (c) => {
    await handleToggle(c);
    const result = await handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleToggleAllCommand = useCallback(async (c) => {
    await handleToggleAll(c);
    const result = await handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  return (
    <TodoController
      selectTodosQueryResult={selectTodosQueryResult}
      onAddTodoCommand={handleAddTodoCommand}
      onClearCompletedCommand={handleClearCompletedCommand}
      onDestroyCommand={handleDestroyCommand}
      onSaveCommand={handleSaveCommand}
      onSelectTodosQuery={handleSelectTodosQuery}
      onToggleCommand={handleToggleCommand}
      onToggleAllCommand={handleToggleAllCommand}
    />
  );
}

export default App;
