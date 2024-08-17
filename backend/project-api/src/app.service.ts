import { Injectable } from '@nestjs/common';

// 服務用於封裝業務邏輯和數據處理。

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
