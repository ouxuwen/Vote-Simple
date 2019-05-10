import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { scheduleCronstyle } from '../src/unit/scheduleNotice';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // scheduleCronstyle('30 * * * * *', () => {
  //   console.log('scheduleCronstyle:' + new Date());
  // });
}
bootstrap();
