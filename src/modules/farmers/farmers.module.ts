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
import { GetFarmersUseCase } from './application/get-farmers/get-farmers.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([FarmersEntity])],
  controllers: [FarmersController],
  providers: [
    FarmersRepository,
    FarmersValidationCpfCnpjUseCase,
    {
      provide: CreateFarmersUseCase,
      useFactory: (farmersRepository: FarmersRepository) =>
        new CreateFarmersUseCase(
          farmersRepository,
          new FarmersValidationCpfCnpjUseCase(),
        ),
      inject: [FarmersRepository],
    },
    {
      provide: UpdateFarmersUseCase,
      useFactory: (farmersRepository: FarmersRepository) =>
        new UpdateFarmersUseCase(
          farmersRepository,
          new FarmersValidationCpfCnpjUseCase(),
        ),
      inject: [FarmersRepository],
    },
    {
      provide: DeleteFarmersUseCase,
      useFactory: (farmersRepository: FarmersRepository) =>
        new DeleteFarmersUseCase(farmersRepository),
      inject: [FarmersRepository],
    },
    {
      provide: GetFarmersUseCase,
      useFactory: (farmersRepository: FarmersRepository) =>
        new GetFarmersUseCase(farmersRepository),
      inject: [FarmersRepository],
    },
    {
      provide: GetDashboardDataUseCase,
      useFactory: (farmersRepository: FarmersRepository) =>
        new GetDashboardDataUseCase(farmersRepository),
      inject: [FarmersRepository],
    },
  ],
})
export class FarmersModule {}
