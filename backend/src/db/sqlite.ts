import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

import Database from 'better-sqlite3';

const fallbackDatabasePath = './data/todos.db';

export function getDatabasePath(): string {
  return process.env.SQLITE_DB_PATH ?? fallbackDatabasePath;
}

export function openDatabase(databasePath = getDatabasePath()): Database.Database {
  ensureDatabaseDirectory(databasePath);
  return new Database(databasePath);
}

export function initializeDatabase(databasePath = getDatabasePath()): Database.Database {
  const database = openDatabase(databasePath);

  database.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL
    );
  `);

  return database;
}

function ensureDatabaseDirectory(databasePath: string): void {
  mkdirSync(dirname(databasePath), { recursive: true });
}
