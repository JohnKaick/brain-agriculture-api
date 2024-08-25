import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmersController } from './infrastructure/controllers/farmers.controller';
import { FarmersRepository } from './infrastructure/repositories/farmers.repository';
import { FarmersEntity } from './domain/entities/farmers.entity';
import { CreateFarmersUseCase } from './application/create-farmers/create-farmers.usecase';
import { DeleteFarmersUseCase } from './application/delete-farmers/delete-farmers.use.case';
import { FarmersValidationCpfCnpjUseCase } from './application/farmers-validation-cpf-cnpj/farmers-validation-cpf-cnpj.usecase';
import { GetDashboardDataUseCase } from './application/get-dashboard-data/get-dashboard-data.usecase';
import { UpdateFarmersUseCase } from './application/update-farmers/update-farmers.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([FarmersEntity])],
  controllers: [FarmersController],
  providers: [
    FarmersRepository,
    {
      provide: 'CreateFarmerUseCase',
      useFactory: (farmersRepository: FarmersRepository) =>
        new CreateFarmersUseCase(
          farmersRepository,
          new FarmersValidationCpfCnpjUseCase(),
        ),
      inject: [FarmersRepository],
    },
    {
      provide: 'UpdateFarmerUseCase',
      useFactory: (farmersRepository: FarmersRepository) =>
        new UpdateFarmersUseCase(
          farmersRepository,
          new FarmersValidationCpfCnpjUseCase(),
        ),
      inject: [FarmersRepository],
    },
    {
      provide: 'DeleteFarmerUseCase',
      useFactory: (farmersRepository: FarmersRepository) =>
        new DeleteFarmersUseCase(farmersRepository),
      inject: [FarmersRepository],
    },
    {
      provide: 'GetDashboardDataUseCase',
      useFactory: (farmersRepository: FarmersRepository) =>
        new GetDashboardDataUseCase(farmersRepository),
      inject: [FarmersRepository],
    },
    {
      provide: 'FarmersValidationCpfCnpjUseCase',
      useFactory: () => new FarmersValidationCpfCnpjUseCase(),
    },
  ],
  exports: [
    'CreateFarmerUseCase',
    'UpdateFarmerUseCase',
    'DeleteFarmerUseCase',
    'GetDashboardDataUseCase',
    'FarmersValidationCpfCnpjUseCase',
  ],
})
export class FarmersModule {}
