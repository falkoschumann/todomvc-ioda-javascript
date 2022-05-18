// @ts-check

import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';
import { createAddTodoHandler } from '../messagehandlers/addTodo';

describe('Add todo', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
    ]);
  });

  it('saves new todo.', async () => {
    const status = await createAddTodoHandler(todosRepository)({ title: 'Buy a Unicorn' });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('does nothing if title is empty.', async () => {
    const status = await createAddTodoHandler(todosRepository)({ title: '' });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 1, title: 'Taste JavaScript', completed: true }]);
  });
});
