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

const todosRepository = new MemoryTodosRepository();

const backend = {
  addTodo: (c) => addTodo(todosRepository, c),
  clearCompleted: (c) => clearCompleted(todosRepository, c),
  destroy: (c) => destroy(todosRepository, c),
  save: (c) => save(todosRepository, c),
  selectTodos: (q) => selectTodos(todosRepository, q),
  toggle: (c) => toggle(todosRepository, c),
  toggleAll: (c) => toggleAll(todosRepository, c),
};

export default backend;
