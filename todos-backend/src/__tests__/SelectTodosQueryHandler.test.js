// @ts-check

import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';
import { SelectTodosQueryHandler } from '../messagehandlers/SelectTodosQueryHandler';

describe('Destroy', () => {
  it('removes the todo', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
    const handler = new SelectTodosQueryHandler(todosRepository);

    const result = await handler.handle({});

    expect(result).toEqual({
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    });
  });
});
