import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import cookie-session via commonjs syntax
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // sets cookie sessions globally
  app.use(
    cookieSession({
      keys: ['RfUjXn2r5u8x/A?D(G+KbPeShVkYp3s6'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      // strips off additional properties from requests body
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
