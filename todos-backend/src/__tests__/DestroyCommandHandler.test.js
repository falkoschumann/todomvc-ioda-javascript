// @ts-check

import { DestroyCommandHandler } from '../messagehandlers/DestroyCommandHandler';
import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';

describe('Destroy', () => {
  it('removes the todo', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
    const handler = new DestroyCommandHandler(todosRepository);

    const status = await handler.handle({ todoId: 1 });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});
