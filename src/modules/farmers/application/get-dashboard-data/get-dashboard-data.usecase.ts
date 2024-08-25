import { Injectable } from '@nestjs/common';
import { FarmersRepositoryInterface } from '../../domain/interfaces/farmers-repository.interface';

@Injectable()
export class GetDashboardDataUseCase {
  constructor(private readonly farmersRepository: FarmersRepositoryInterface) {}

  async execute() {
    const totalFarmers = await this.farmersRepository.getFarmersCount();
    const totalArea = await this.farmersRepository.getTotalArea();
    const farmersByState = await this.farmersRepository.getFarmersByState();
    const cropsDistribution =
      await this.farmersRepository.getCropsDistribution();
    const landUsage = await this.farmersRepository.getLandUsage();

    return {
      totalFarmers,
      totalArea,
      farmersByState,
      cropsDistribution,
      landUsage,
    };
  }
}
