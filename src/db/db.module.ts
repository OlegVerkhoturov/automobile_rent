import { Module, Provider } from '@nestjs/common';
// import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';
import connection from './index';

// const connectionString =
//   'postgresql://postgres:@localhost:5432/automobile_rent';
const dbProvider = {
  provide: PG_CONNECTION,
  useValue: connection,
} as Provider;

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
