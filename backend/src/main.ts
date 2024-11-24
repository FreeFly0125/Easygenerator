import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { CustomLoggerService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(CustomLoggerService);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(3000);

  logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
