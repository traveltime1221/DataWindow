import { Controller, Get, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get('quote')
  async getStockQuote(@Query('symbol') symbol: string) {
    return await this.stocksService.getStockQuote(symbol);
  }
}
