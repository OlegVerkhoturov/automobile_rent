import connection from './index';
import { defaultRates, defaultDiscounts } from '../constants';

const fillRates = async (data) => {
  const existedRates = await connection.query('SELECT * FROM "Rates"');
  if (
    Array.isArray(existedRates.rows) &&
    existedRates.rows.length > defaultRates.length - 1
  ) {
    return false;
  }

  await connection.query(
    `
    INSERT INTO "Rates" (price, distance, name) VALUES (
      $1,
      $2,
      $3
    );
  `,
    [data.price, data.distance, data.name],
  );
  return true;
};

const fillDiscounts = async (data) => {
  const existedDiscounts = await connection.query('SELECT * FROM "Discounts"');
  if (
    Array.isArray(existedDiscounts.rows) &&
    existedDiscounts.rows.length > defaultDiscounts.length - 1
  ) {
    return false;
  }
  await connection.query(
    `
  INSERT INTO "Discounts" (percent, minDays, maxDays) VALUES (
    $1,
    $2,
    $3
  );
`,
    [data.percent, data.minDays, data.maxDays],
  );
  return true;
};

export default async function fillDefault() {
  for await (const rate of defaultRates) {
    try {
      const result = await fillRates(rate);
      if (!result) {
        throw Error('-- database: default rates already exists');
      }
    } catch (error) {
      const { message } = error;
      if (!message || !message.includes('already exists')) {
        throw error;
      }
    }
  }

  for await (const discount of defaultDiscounts) {
    try {
      const result = await fillDiscounts(discount);
      if (!result) {
        throw Error('-- database: default rates already exists');
      }
    } catch (error) {
      const { message } = error;
      if (!message || !message.includes('already exists')) {
        throw error;
      }
    }
  }

  return console.log('-- database: default fill is done');
}
