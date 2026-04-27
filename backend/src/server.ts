import app from './app';

const port = process.env.PORT ?? '3000';

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
