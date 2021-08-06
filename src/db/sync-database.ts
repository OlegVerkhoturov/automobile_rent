import Discounts from './tables/Discounts.table';
import Rates from './tables/Rates.table';
import Rents from './tables/Rents.table';
import connection from './index';

/**
 * Synchronize database
 * @returns {null | Error}
 */
export default async function syncDatabase() {
  const tables = [Discounts, Rates, Rents];

  /* eslint-disable-next-line */
  for await (let table of tables) {
    try {
      await connection.query(table);
    } catch (error) {
      const { message } = error;
      if (!message || !message.includes('already exists')) {
        throw error;
      }
    }
  }

  return console.log('-- database: synchronization is done');
}
