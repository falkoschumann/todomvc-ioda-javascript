// @ts-check

import { BrowserRouter as Router } from 'react-router-dom';
import React, { useCallback, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom/client';

import { messageHandler } from 'todos-backend';

import { reducer, initialState } from './components/reducer';
import TodoApp from './components/TodoApp';
import reportWebVitals from './reportWebVitals';

import './index.css';

/**
 * @typedef {import('./components/TodoItem').TodoId} TodoId
 */

function App() {
  // TODO: Extract App to file App.js
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddTodo = useCallback((title) => {
    messageHandler.addTodo(title);
    const todos = messageHandler.selectTodos();
    dispatch({ type: 'TODO_ADDED', todos });
  }, []);

  const handleCancel = useCallback(() => {
    dispatch({ type: 'CANCEL' });
  }, []);

  const handleClearCompleted = useCallback(() => {
    messageHandler.clearCompleted();
    const todos = messageHandler.selectTodos();
    dispatch({ type: 'CLEARED_COMPLETED', todos });
  }, []);

  const handleDestroy = useCallback((todoId) => {
    messageHandler.destroy(todoId);
    const todos = messageHandler.selectTodos();
    dispatch({ type: 'DESTROYED', todos });
  }, []);

  const handleEdit = useCallback((todoId) => {
    dispatch({ type: 'EDIT', todoId });
  }, []);

  const handleLocationChanged = useCallback((pathname) => {
    dispatch({ type: 'LOCATION_CHANGED', pathname });
  }, []);

  const handleSave = useCallback((todoId, newTitle) => {
    messageHandler.save(todoId, newTitle);
    const todos = messageHandler.selectTodos();
    dispatch({ type: 'SAVED', todos });
  }, []);

  const handleToggle = useCallback((todoId) => {
    messageHandler.toggle(todoId);
    const todos = messageHandler.selectTodos();
    dispatch({ type: 'TOGGLED', todos });
  }, []);

  const handleToggleAll = useCallback((checked) => {
    messageHandler.toggleAll(checked);
    const todos = messageHandler.selectTodos();
    dispatch({ type: 'TOGGLED_ALL', todos });
  }, []);

  const handleUpdateNewTodo = useCallback((text) => {
    dispatch({ type: 'UPDATE_NEW_TODO', text });
  }, []);

  useEffect(() => {
    const todos = messageHandler.selectTodos();
    dispatch({ type: 'TODOS_LOADED', todos });
  }, []);

  // TODO: Move Router to <TodoApp>
  return (
    <Router>
      <TodoApp
        activeTodoCount={state.activeTodoCount}
        completedCount={state.completedCount}
        editing={state.editing}
        newTodo={state.newTodo}
        nowShowing={state.nowShowing}
        shownTodos={state.shownTodos}
        todos={state.todos}
        onAddTodo={handleAddTodo}
        onCancel={handleCancel}
        onClearCompleted={handleClearCompleted}
        onDestroy={handleDestroy}
        onEdit={handleEdit}
        onLocationChanged={handleLocationChanged}
        onSave={handleSave}
        onToggle={handleToggle}
        onToggleAll={handleToggleAll}
        onUpdateNewTodo={handleUpdateNewTodo}
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
