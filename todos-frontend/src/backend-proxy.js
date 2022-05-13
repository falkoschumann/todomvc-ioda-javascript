// @ts-check

import TodosApi from './api/TodosApi';

const backend = {
  addTodo: TodosApi.addTodo,
  clearCompleted: TodosApi.clearCompleted,
  destroy: TodosApi.destroy,
  save: TodosApi.save,
  selectTodos: TodosApi.selectTodos,
  toggle: TodosApi.toggle,
  toggleAll: TodosApi.toggleAll,
};

export default backend;
