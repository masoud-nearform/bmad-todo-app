import express from 'express';

import healthRouter from './routes/health';
import todosRouter from './routes/todos';

const app = express();

app.use(express.json());
app.use(healthRouter);
app.use(todosRouter);

export default app;
