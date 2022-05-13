// @ts-check

import { useCallback, useState } from 'react';

import TodoController from './components/TodoController';
import backend from './backend-proxy.js';

function App() {
  const [selectTodosQueryResult, setSelectTodosQueryResult] = useState({ todos: [] });

  const handleAddTodoCommand = useCallback(async (c) => {
    await backend.addTodo(c);
    const result = await backend.selectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleClearCompletedCommand = useCallback(async (c) => {
    await backend.clearCompleted(c);
    const result = await backend.selectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleDestroyCommand = useCallback(async (c) => {
    await backend.destroy(c);
    const result = await backend.selectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleSaveCommand = useCallback(async (c) => {
    await backend.save(c);
    const result = await backend.selectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleSelectTodosQuery = useCallback(async (c) => {
    const result = await backend.selectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleToggleCommand = useCallback(async (c) => {
    await backend.toggle(c);
    const result = await backend.selectTodos({});
    setSelectTodosQueryResult(result);
  }, []);

  const handleToggleAllCommand = useCallback(async (c) => {
    await backend.toggleAll(c);
    const result = await backend.selectTodos({});
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
