import { randomUUID } from 'node:crypto';

import { initializeDatabase } from './sqlite';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

type TodoRow = {
  id: string;
  text: string;
  completed: number;
  createdAt: string;
};

export function createTodo(text: string): Todo {
  const database = initializeDatabase();
  const todo: Todo = {
    id: randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  try {
    database
      .prepare('INSERT INTO todos (id, text, completed, createdAt) VALUES (?, ?, ?, ?)')
      .run(todo.id, todo.text, 0, todo.createdAt);

    return todo;
  } finally {
    database.close();
  }
}

export function listTodos(): Todo[] {
  const database = initializeDatabase();

  try {
    const rows = database
      .prepare('SELECT id, text, completed, createdAt FROM todos ORDER BY createdAt ASC')
      .all() as TodoRow[];

    return rows.map(toTodo);
  } finally {
    database.close();
  }
}

function toTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    text: row.text,
    completed: Boolean(row.completed),
    createdAt: row.createdAt,
  };
}
