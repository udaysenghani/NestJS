import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { CustomInterceptor } from './interceptors/customInterseptor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalInterceptors(new CustomInterceptor()); // Global level interceptor
  app.useGlobalFilters(new HttpExceptionFilter()); //Global exception handlling
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
