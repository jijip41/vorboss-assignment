import express from 'express';
import Airtable from 'airtable';
import cors from 'cors';
import { config } from '../config.js';

const PORT = process.env.PORT || 3001;

const app = express();

Airtable.configure({
  endpointUrl: config.airtable.endpontUrl,
  apiKey: config.airtable.apiKey,
});
const base = Airtable.base(config.airtable.base);

app.use(cors());

app.get('/getAll', async (req, res) => {
  const arr = [];
  await base
    .table('Orders')
    .select({})
    .eachPage((records, next) => {
      records.forEach((rec) => {
        try {
          arr.push(rec.fields);
        } catch (err) {
          console.error(err);
        }
      });
      try {
        next();
      } catch {
        return;
      }
    }),
    res.status(200).send(arr);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
