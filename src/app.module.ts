import { Module } from '@nestjs/common';
import { FarmersModule } from './modules/farmers/farmers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), FarmersModule],
})
export class AppModule {}
