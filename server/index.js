import express from 'express';
import path from 'path';
import url from 'url';
import cors from 'cors';
import ordersRouter from './router/orders.js';

const PORT = process.env.PORT || 3001;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/orders', ordersRouter);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
