import { Router } from 'express';

import { createTodo, listTodos } from '../db/todosPersistence';
import { validateCreateTodoInput } from '../validation/todoValidation';

const todosRouter = Router();

todosRouter.get('/api/todos', (_request, response) => {
  try {
    response.status(200).json(listTodos());
  } catch {
    response.status(500).json({ error: { message: 'Unexpected server error' } });
  }
});

todosRouter.post('/api/todos', (request, response) => {
  try {
    const input = validateCreateTodoInput(request.body);
    const todo = createTodo(input.text);

    response.status(201).json(todo);
  } catch (error) {
    if (error instanceof Error && error.message === 'Todo text is required') {
      response.status(400).json({ error: { message: error.message } });
      return;
    }

    response.status(500).json({ error: { message: 'Unexpected server error' } });
  }
});

export default todosRouter;
