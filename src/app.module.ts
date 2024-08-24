import { Module } from '@nestjs/common';
import { FarmersModule } from './modules/farmers/farmers.module';

@Module({
  imports: [FarmersModule],
})
export class AppModule {}
