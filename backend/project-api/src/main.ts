import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 入口點, 啟動應用程式
async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // 允許通過域名：暫時先用這個方式, 找時間改到設定黨
  const allowedOrigins = ['http://localhost:3000']

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('not allowed by CORS'))
      }
    },
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Accept'
  })
  // http://localhost:3001/typhoon-day-info/data
  await app.listen(3001);
}
bootstrap();
