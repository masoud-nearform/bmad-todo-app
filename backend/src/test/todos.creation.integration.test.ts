import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import app from '../app';

const originalSqliteDbPath = process.env.SQLITE_DB_PATH;

let temporaryDirectory: string | undefined;

beforeEach(() => {
  temporaryDirectory = mkdtempSync(join(tmpdir(), 'bmad-todo-api-'));
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

describe('POST /api/todos', () => {
  it('creates a todo with trimmed text and persists it for API read-back', async () => {
    const createResponse = await request(app)
      .post('/api/todos')
      .send({ text: '  Buy milk  ' })
      .expect(201);

    expect(createResponse.body).toEqual({
      id: expect.any(String),
      text: 'Buy milk',
      completed: false,
      createdAt: expect.any(String),
    });
    expect(Date.parse(createResponse.body.createdAt)).not.toBeNaN();

    const listResponse = await request(app).get('/api/todos').expect(200);

    expect(listResponse.body).toEqual([
      {
        id: createResponse.body.id,
        text: 'Buy milk',
        completed: false,
        createdAt: createResponse.body.createdAt,
      },
    ]);
  });

  it.each([
    ['missing text', {}],
    ['empty text', { text: '' }],
    ['whitespace text', { text: '   ' }],
    ['non-string text', { text: 123 }],
  ])('rejects invalid creation input and does not persist data: %s', async (_caseName, body) => {
    const createResponse = await request(app).post('/api/todos').send(body).expect(400);

    expect(createResponse.body).toEqual({
      error: {
        message: 'Todo text is required',
      },
    });

    const listResponse = await request(app).get('/api/todos').expect(200);

    expect(listResponse.body).toEqual([]);
  });
});
