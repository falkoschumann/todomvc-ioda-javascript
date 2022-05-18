// @ts-check

import {
  MemoryTodosRepository,
  createAddTodoHandler,
  createClearCompletedHandler,
  createDestroyHandler,
  createSaveHandler,
  createSelectTodosHandler,
  createToggleAllHandler,
  createToggleHandler,
} from 'todos-backend';

const todosRepository = new MemoryTodosRepository();

const backend = {
  addTodo: createAddTodoHandler(todosRepository),
  clearCompleted: createClearCompletedHandler(todosRepository),
  destroy: createDestroyHandler(todosRepository),
  save: createSaveHandler(todosRepository),
  selectTodos: createSelectTodosHandler(todosRepository),
  toggle: createToggleHandler(todosRepository),
  toggleAll: createToggleAllHandler(todosRepository),
};

export default backend;
