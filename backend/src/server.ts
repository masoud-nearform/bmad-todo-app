import app from './app';
import { initializeDatabase } from './db/sqlite';

const port = process.env.PORT ?? '3000';

initializeDatabase();

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
