import { Module } from '@nestjs/common';
import { FarmersModule } from './modules/farmers/farmers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './ormconfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    FarmersModule,
  ],
})
export class AppModule {}
