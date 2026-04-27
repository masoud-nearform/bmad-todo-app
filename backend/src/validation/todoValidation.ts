export type CreateTodoInput = {
  text: string;
};

export function validateCreateTodoInput(body: unknown): CreateTodoInput {
  if (!isObject(body) || typeof body.text !== 'string') {
    throw new Error('Todo text is required');
  }

  const text = body.text.trim();

  if (!text) {
    throw new Error('Todo text is required');
  }

  return { text };
}

function isObject(value: unknown): value is { text?: unknown } {
  return typeof value === 'object' && value !== null;
}
