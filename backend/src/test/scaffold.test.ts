import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('backend test scaffold', () => {
  it('uses an isolated SQLite path for backend tests', () => {
    expect(process.env.SQLITE_DB_PATH).toBe('./data/test-todos.db');
  });

  it('has Supertest available for future Express app contract tests', () => {
    expect(typeof request).toBe('function');
  });
});
