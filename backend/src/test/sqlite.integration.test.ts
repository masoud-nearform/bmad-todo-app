import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { getDatabasePath, initializeDatabase } from '../db/sqlite';

const developmentDatabasePath = './data/todos.db';
const originalSqliteDbPath = process.env.SQLITE_DB_PATH;

let temporaryDirectory: string | undefined;

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

describe('SQLite schema initialisation', () => {
  it('uses the configured database path and creates the todos schema', () => {
    temporaryDirectory = mkdtempSync(join(tmpdir(), 'bmad-todo-sqlite-'));
    const databasePath = join(temporaryDirectory, 'nested', 'test-todos.db');
    process.env.SQLITE_DB_PATH = databasePath;

    expect(getDatabasePath()).toBe(databasePath);
    expect(getDatabasePath()).not.toBe(developmentDatabasePath);

    const database = initializeDatabase();

    try {
      expect(existsSync(databasePath)).toBe(true);

      const table = database
        .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'todos'")
        .get();
      expect(table).toEqual({ name: 'todos' });

      const tableInfo = database
        .prepare('PRAGMA table_info(todos)')
        .all() as Array<{ name: string }>;
      const columns = tableInfo.map((column) => column.name);

      expect(columns).toEqual(['id', 'text', 'completed', 'createdAt']);
    } finally {
      database.close();
    }
  });
});
