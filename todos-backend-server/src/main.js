// @ts-check

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import {
  createAddTodoHandler,
  createClearCompletedHandler,
  createDestroyHandler,
  createSaveHandler,
  createSelectTodosHandler,
  createToggleAllHandler,
  createToggleHandler,
} from 'todos-backend';
import { FileTodosRepository } from './adapters/FileTodosRepository.js';
import { createAddTodoController } from './controllers/addTodo.js';
import { createClearCompletedController } from './controllers/clearCompleted.js';
import { createDestroyController } from './controllers/destroy.js';
import { createSaveController } from './controllers/save.js';
import { createSelectTodosController } from './controllers/selectTodos.js';
import { createToggleAllController } from './controllers/toggleAll.js';
import { createToggleController } from './controllers/toggle.js';

const app = express();
const port = process.env.PORT ?? 3000;

const todosRepository = new FileTodosRepository();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.post(
  '/api/todos/add-todo',
  cors(),
  createAddTodoController(createAddTodoHandler(todosRepository))
);
app.post(
  '/api/todos/clear-completed',
  cors(),
  createClearCompletedController(createClearCompletedHandler(todosRepository))
);
app.post(
  '/api/todos/destroy',
  cors(),
  createDestroyController(createDestroyHandler(todosRepository))
);
app.post('/api/todos/save', cors(), createSaveController(createSaveHandler(todosRepository)));
app.post('/api/todos/toggle', cors(), createToggleController(createToggleHandler(todosRepository)));
app.post(
  '/api/todos/toggle-all',
  cors(),
  createToggleAllController(createToggleAllHandler(todosRepository))
);
app.get(
  '/api/todos/select-todos',
  cors(),
  createSelectTodosController(createSelectTodosHandler(todosRepository))
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
