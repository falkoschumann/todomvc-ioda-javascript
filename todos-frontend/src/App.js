// @ts-check

import { useCallback, useState } from 'react';

import {
  LocalStorageTodosRepository,
  createAddTodoHandler,
  createClearCompletedHandler,
  createDestroyHandler,
  createSaveHandler,
  createSelectTodosHandler,
  createToggleAllHandler,
  createToggleHandler,
} from 'todos-backend';
import TodoController from './components/TodoController';
import TodosApi from './api/TodosApi';

const { useBackendProxy } = getEnvOptions();

const backend = useBackendProxy ? createBackendProxy() : createLocalBackend();

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

function getEnvOptions() {
  const useBackendProxy = process.env.REACT_APP_USE_BACKEND_PROXY;
  if (useBackendProxy) {
    console.warn(`Using backend proxy.`);
  } else {
    console.warn(`Using local backend.`);
  }

  return { useBackendProxy };
}

function createLocalBackend() {
  const todosRepository = new LocalStorageTodosRepository();
  return {
    addTodo: createAddTodoHandler(todosRepository),
    clearCompleted: createClearCompletedHandler(todosRepository),
    destroy: createDestroyHandler(todosRepository),
    save: createSaveHandler(todosRepository),
    selectTodos: createSelectTodosHandler(todosRepository),
    toggle: createToggleHandler(todosRepository),
    toggleAll: createToggleAllHandler(todosRepository),
  };
}

function createBackendProxy() {
  return {
    addTodo: TodosApi.addTodo,
    clearCompleted: TodosApi.clearCompleted,
    destroy: TodosApi.destroy,
    save: TodosApi.save,
    selectTodos: TodosApi.selectTodos,
    toggle: TodosApi.toggle,
    toggleAll: TodosApi.toggleAll,
  };
}
