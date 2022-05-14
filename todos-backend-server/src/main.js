// @ts-check

import bodyParser from 'body-parser';
import cors from 'cors';
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

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cors());

app.get('/api/todos/select-todos', cors(), getSelectTodos(todosRepository));
app.post('/api/todos/add-todo', cors(), postAddTodo(todosRepository));
app.post('/api/todos/clear-completed', cors(), postClearCompleted(todosRepository));
app.post('/api/todos/destroy', cors(), postDestroy(todosRepository));
app.post('/api/todos/save', cors(), postSave(todosRepository));
app.post('/api/todos/toggle', cors(), postToggle(todosRepository));
app.post('/api/todos/toggle-all', cors(), postToggleAll(todosRepository));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
