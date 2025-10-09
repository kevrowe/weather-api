import express from 'express';
import routeHandler from './routes/weather';
import { dbReady } from './db';

async function startServer() {
  const app = express();
  const port = 3010;

  app.use(express.json())

  app.use('/weather', routeHandler);

  app.use('/', (_, res) => {
    res.status(200).json({ status: 'ok' })
  })

  // Wait for database to be ready before starting server
  console.log('Waiting for database to be ready...');

  try {
    await dbReady;
    console.log('Database ready, starting server...');

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

startServer();

