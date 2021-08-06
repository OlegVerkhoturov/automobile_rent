import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import createDatabase from './db/create-database';
import syncDatabase from './db/sync-database';
import fillDefault from './db/fill-default';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await createDatabase();
  await syncDatabase();
  await fillDefault();
  await app.listen(3000);
}
bootstrap();
