import express from 'express';
import routeHandler from './routes/weather'

const app = express();
const port = 3010;

app.use(express.json())

app.use('/weather', routeHandler);

app.use('/', (_, res) => {
  res.status(200).json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

