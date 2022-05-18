// @ts-check

import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';
import { createDestroyHandler } from '../messagehandlers/destroy';

describe('Destroy', () => {
  it('removes the todo.', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);

    const status = await createDestroyHandler(todosRepository)({ todoId: 1 });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});
