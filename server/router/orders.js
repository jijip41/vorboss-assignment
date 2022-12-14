import express from 'express';
import Airtable from 'airtable';
import { config } from '../../config.js';

Airtable.configure({
  endpointUrl: config.airtable.endpontUrl,
  apiKey: config.airtable.apiKey,
});
const base = Airtable.base(config.airtable.base);

const router = express.Router();

router.get('/total', async (req, res, next) => {
  const arr = [];
  await base
    .table('Orders')
    .select({
      view: 'Grid view',
      sort: [{ field: config.airtable.placedDateId, direction: 'desc' }],
    })
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
    });
  if (arr) {
    res.status(200).json(arr);
  } else {
    res.sendStatus(404);
  }
});

router.get('/:maxRecords', async (req, res, next) => {
  const maxNumber = Number(req.params.maxRecords);
  const arr = [];
  await base
    .table('Orders')
    .select({
      maxRecords: maxNumber,
      view: 'Grid view',
      sort: [{ field: config.airtable.placedDateId, direction: 'desc' }],
    })
    .eachPage((records, next) => {
      records.forEach((rec) => {
        arr.push(rec.fields);
      });
      next();
    })
    .catch(console.error);
  if (arr) {
    res.status(200).json(arr);
  } else {
    res.sendStatus(404);
  }
});

export default router;
