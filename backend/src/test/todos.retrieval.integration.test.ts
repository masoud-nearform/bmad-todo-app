import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import app from '../app';
import { initializeDatabase } from '../db/sqlite';

const originalSqliteDbPath = process.env.SQLITE_DB_PATH;

let temporaryDirectory: string | undefined;

beforeEach(() => {
  temporaryDirectory = mkdtempSync(join(tmpdir(), 'bmad-todo-retrieval-'));
  process.env.SQLITE_DB_PATH = join(temporaryDirectory, 'todos.db');
});

afterEach(() => {
  if (temporaryDirectory) {
    rmSync(temporaryDirectory, { recursive: true, force: true });
    temporaryDirectory = undefined;
  }

  if (originalSqliteDbPath === undefined) {
    delete process.env.SQLITE_DB_PATH;
  } else {
    process.env.SQLITE_DB_PATH = originalSqliteDbPath;
  }
});

describe('GET /api/todos', () => {
  it('returns an empty array when no todos exist', async () => {
    const response = await request(app).get('/api/todos').expect(200);

    expect(response.body).toEqual([]);
  });

  it('returns todos with the API shape in ascending createdAt order', async () => {
    seedTodos([
      {
        id: 'todo-latest',
        text: 'Latest task',
        completed: 1,
        createdAt: '2026-04-27T15:10:00.000Z',
      },
      {
        id: 'todo-earliest',
        text: 'Earliest task',
        completed: 0,
        createdAt: '2026-04-27T15:00:00.000Z',
      },
      {
        id: 'todo-middle',
        text: 'Middle task',
        completed: 0,
        createdAt: '2026-04-27T15:05:00.000Z',
      },
    ]);

    const response = await request(app).get('/api/todos').expect(200);

    expect(response.body).toEqual([
      {
        id: 'todo-earliest',
        text: 'Earliest task',
        completed: false,
        createdAt: '2026-04-27T15:00:00.000Z',
      },
      {
        id: 'todo-middle',
        text: 'Middle task',
        completed: false,
        createdAt: '2026-04-27T15:05:00.000Z',
      },
      {
        id: 'todo-latest',
        text: 'Latest task',
        completed: true,
        createdAt: '2026-04-27T15:10:00.000Z',
      },
    ]);

    for (const todo of response.body) {
      expect(Object.keys(todo).sort()).toEqual(['completed', 'createdAt', 'id', 'text']);
      expect(typeof todo.completed).toBe('boolean');
      expect(new Date(todo.createdAt).toISOString()).toBe(todo.createdAt);
    }
  });
});

type SeedTodo = {
  id: string;
  text: string;
  completed: number;
  createdAt: string;
};

function seedTodos(todos: SeedTodo[]): void {
  const database = initializeDatabase();

  try {
    const insertTodo = database.prepare(
      'INSERT INTO todos (id, text, completed, createdAt) VALUES (?, ?, ?, ?)',
    );

    for (const todo of todos) {
      insertTodo.run(todo.id, todo.text, todo.completed, todo.createdAt);
    }
  } finally {
    database.close();
  }
}
