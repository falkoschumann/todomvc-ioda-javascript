// @ts-check

import { useCallback, useState } from 'react';

import backend from './backend.js';

import TodoController from './components/TodoController';

function App() {
  const [selectTodosQueryResult, setSelectTodosQueryResult] = useState({ todos: [] });

  const handleAddTodoCommand = useCallback(async (c) => {
    await backend.handleAddTodo(c);
    const result = await backend.handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleClearCompletedCommand = useCallback(async (c) => {
    await backend.handleClearCompleted(c);
    const result = await backend.handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleDestroyCommand = useCallback(async (c) => {
    await backend.handleDestroy(c);
    const result = await backend.handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleSaveCommand = useCallback(async (c) => {
    await backend.handleSave(c);
    const result = await backend.handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleSelectTodosQuery = useCallback(async (c) => {
    const result = await backend.handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleToggleCommand = useCallback(async (c) => {
    await backend.handleToggle(c);
    const result = await backend.handleSelectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleToggleAllCommand = useCallback(async (c) => {
    await backend.handleToggleAll(c);
    const result = await backend.handleSelectTodos({});
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
