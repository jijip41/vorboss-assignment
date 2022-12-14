import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (!value) throw new Error(`${key} not found`);
  return value;
}

export const config = {
  airtable: {
    endpontUrl: required('AIRTABLE_ENDPOINT_URL'),
    apiKey: required('AIRTABLE_API_KEY'),
    base: required('AIRTABLE_BASE'),
    placedDateId: required('AIRTABLE_PLACED_DATE_ID'),
  },
};
