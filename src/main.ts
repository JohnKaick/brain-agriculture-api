import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './ormconfig';
import { PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await AppDataSource.initialize();

  if (AppDataSource.options.migrationsRun) {
    await AppDataSource.runMigrations();
  }

  await app.listen(PORT);
}
bootstrap();
