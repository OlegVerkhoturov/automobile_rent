import { exec } from 'child_process';
import { promisify } from 'util';

import { DATABASE_NAME } from '../../configuration';

const execPromise = promisify(exec);

/**
 * Create database with PSQL
 * @returns {void | Error}
 */
export default async function createDatabase() {
  try {
    console.log('DATABASE_NAME', DATABASE_NAME);
    const { stderr } = await execPromise(`createdb ${DATABASE_NAME}`);
    if (stderr) {
      throw stderr;
    }

    return console.log('-- database: created database');
  } catch (error) {
    const { stderr } = error;
    if (
      stderr &&
      stderr.includes(`database "${DATABASE_NAME}" already exists`)
    ) {
      return console.log('-- database: database already exists');
    }

    throw error;
  }
}
