import express from 'express';
import path from 'path';
import url from 'url';
import Airtable from 'airtable';
import cors from 'cors';
import { config } from '../config.js';

const PORT = process.env.PORT || 3001;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

Airtable.configure({
  endpointUrl: config.airtable.endpontUrl,
  apiKey: config.airtable.apiKey,
});
const base = Airtable.base(config.airtable.base);

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/getAll', async (req, res) => {
  const arr = [];
  await base
    .table('Orders')
    .select({ maxRecords: 1000, view: 'Grid view' })
    .eachPage((records, next) => {
      records.forEach((rec) => {
        arr.push(rec.fields);
      });
      next();
    })
    .catch(console.error),
    res.status(200).send(arr);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
