// @ts-check

import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';
import { selectTodos } from '../messagehandlers/selectTodos';

describe('Destroy', () => {
  it('removes the todo', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);

    const result = await selectTodos(todosRepository, {});

    expect(result).toEqual({
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    });
  });
});
