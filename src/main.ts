import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  const port = process.env.SERVER_PORT ?? 3000;
  await app.listen(port);
  console.log('Server started on port: ', port);
}
bootstrap();
