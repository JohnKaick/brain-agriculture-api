import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './ormconfig';
import { PORT } from './constants';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerService } from './swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await AppDataSource.initialize();

  if (AppDataSource.options.migrationsRun) {
    await AppDataSource.runMigrations();
  }

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await SwaggerService.generate(app);

  await app.listen(PORT);
}
bootstrap();
