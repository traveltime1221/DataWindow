import { Injectable } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class StocksService {
  async getStockQuote(symbol: string) {
    try {
      const quote = await yahooFinance.quote(symbol);
      return quote;
    } catch (error) {
      throw new Error(`Unable to retrieve stock data: ${error.message}`);
    }
  }
}
