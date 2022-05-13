// @ts-check

import bodyParser from 'body-parser';
import express from 'express';

import { FileTodosRepository } from './adapters/FileTodosRepository.js';
import { getSelectTodos } from './controllers/getSelectTodos.js';
import { postAddTodo } from './controllers/postAddTodo.js';
import { postClearCompleted } from './controllers/postClearCompleted.js';
import { postDestroy } from './controllers/postDestroy.js';
import { postSave } from './controllers/postSave.js';
import { postToggle } from './controllers/postToggle.js';
import { postToggleAll } from './controllers/postToggleAll.js';

const app = express();
const port = process.env.PORT ?? 3000;

const todosRepository = new FileTodosRepository();

app.use(bodyParser.json());
app.get('/select-todos', getSelectTodos(todosRepository));
app.post('/add-todo', postAddTodo(todosRepository));
app.post('/clear-completed', postClearCompleted(todosRepository));
app.post('/destroy', postDestroy(todosRepository));
app.post('/save', postSave(todosRepository));
app.post('/toggle', postToggle(todosRepository));
app.post('/toggle-all', postToggleAll(todosRepository));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
