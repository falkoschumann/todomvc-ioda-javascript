// @ts-check

import { BrowserRouter as Router } from 'react-router-dom';
import React, { useCallback, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom/client';

import {
  AddTodoCommandHandler,
  ClearCompletedCommandHandler,
  DestroyCommandHandler,
  MemoryTodosRepository,
  SaveCommandHandler,
  SelectTodosQueryHandler,
  ToggleAllCommandHandler,
  ToggleCommandHandler,
} from 'todos-backend';

import { reducer, initialState } from './components/reducer';
import TodoApp from './components/TodoApp';
import reportWebVitals from './reportWebVitals';

import './index.css';

const memoryTodosRepository = new MemoryTodosRepository();
const addTodoCommandHandler = new AddTodoCommandHandler(memoryTodosRepository);
const clearCompletedCommandHandler = new ClearCompletedCommandHandler(memoryTodosRepository);
const destroyCommandHandler = new DestroyCommandHandler(memoryTodosRepository);
const saveCommandHandler = new SaveCommandHandler(memoryTodosRepository);
const selectTodosQueryHandler = new SelectTodosQueryHandler(memoryTodosRepository);
const toggleAllCommandHandler = new ToggleAllCommandHandler(memoryTodosRepository);
const toggleCommandHandler = new ToggleCommandHandler(memoryTodosRepository);

function App() {
  // TODO Extract App to file App.js
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddTodo = useCallback(async (title) => {
    await addTodoCommandHandler.handle({ title });
    const result = await selectTodosQueryHandler.handle({});
    dispatch({ type: 'TODO_ADDED', todos: result.todos });
  }, []);

  const handleCancel = useCallback(() => {
    dispatch({ type: 'CANCEL' });
  }, []);

  const handleClearCompleted = useCallback(async () => {
    await clearCompletedCommandHandler.handle({});
    const result = await selectTodosQueryHandler.handle({});
    dispatch({ type: 'CLEARED_COMPLETED', todos: result.todos });
  }, []);

  const handleDestroy = useCallback(async (todoId) => {
    await destroyCommandHandler.handle({ todoId });
    const result = await selectTodosQueryHandler.handle({});
    dispatch({ type: 'DESTROYED', todos: result.todos });
  }, []);

  const handleEdit = useCallback((todoId) => {
    dispatch({ type: 'EDIT', todoId });
  }, []);

  const handleSave = useCallback(async (todoId, newTitle) => {
    await saveCommandHandler.handle({ todoId, newTitle });
    const result = await selectTodosQueryHandler.handle({});
    dispatch({ type: 'SAVED', todos: result.todos });
  }, []);

  const handleToggle = useCallback(async (todoId) => {
    await toggleCommandHandler.handle({ todoId });
    const result = await selectTodosQueryHandler.handle({});
    dispatch({ type: 'TOGGLED', todos: result.todos });
  }, []);

  const handleToggleAll = useCallback(async (checked) => {
    await toggleAllCommandHandler.handle({ checked });
    const result = await selectTodosQueryHandler.handle({});
    dispatch({ type: 'TOGGLED_ALL', todos: result.todos });
  }, []);

  useEffect(() => {
    async function loadTodos() {
      const result = await selectTodosQueryHandler.handle({});
      dispatch({ type: 'TODOS_LOADED', todos: result.todos });
    }

    loadTodos();
  }, []);

  return (
    <Router>
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
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
