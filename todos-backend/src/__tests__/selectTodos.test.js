// @ts-check

import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';
import { createSelectTodosHandler } from '../messagehandlers/selectTodos';

describe('Destroy', () => {
  it('removes the todo.', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);

    const result = await createSelectTodosHandler(todosRepository)({});

    expect(result).toEqual({
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    });
  });
});
