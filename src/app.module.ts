import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RatesController } from './rates/rates.controller';
import { ReportController } from './report/report.controller';
import { DbModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot(), DbModule],
  controllers: [AppController, RatesController, ReportController],
  providers: [AppService],
})
export class AppModule {}
