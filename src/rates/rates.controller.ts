import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';
import { CalculateTrace } from './dto';

@Controller('rates')
export class RatesController {
  constructor(private readonly appService: AppService) {}
  @Post('calculate')
  async calculate(@Body() data: CalculateTrace): Promise<any[]> {
    try {
      const result = await this.appService.calculateRate(data);
      return result;
    } catch (e) {
      console.log('error', e);
      return e;
    }
  }
}
