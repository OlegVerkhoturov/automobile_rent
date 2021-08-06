import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './constants';
import * as moment from 'moment';

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  getHello(): string {
    return 'Hello World!';
  }

  async calculateRate(data) {
    const { startDate, endDate } = data;
    const diffDays = moment(endDate).diff(moment(startDate), 'days') + 1;

    const rates = await this.conn.query('SELECT * FROM "Rates"');
    const discounts = await this.conn.query('SELECT * FROM "Discounts"');

    const result = rates.rows.map((rate) => {
      const { name, price, distance } = rate;
      let currentDiscount = 0;
      discounts.rows.forEach((disc) => {
        const { percent, mindays, maxdays } = disc;
        if (diffDays > mindays && mindays < maxdays) {
          currentDiscount = percent;
        }
      });

      const fullPrice = diffDays * price;
      const priceWithDiscount = fullPrice * ((100 - currentDiscount) / 100);

      return {
        name,
        fullPrice,
        fullDistance: diffDays * distance,
        priceWithDiscount,
      };
    });
    return result;
  }
}
