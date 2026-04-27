import express from 'express';

const app = express();
const port = process.env.PORT ?? '3000';

void app;

console.log(`Backend scaffold ready. HTTP routes will be added in later stories. PORT=${port}`);
