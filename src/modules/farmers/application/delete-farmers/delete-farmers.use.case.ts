import { Injectable } from '@nestjs/common';
import { FarmersRepositoryInterface } from '../../domain/interfaces/farmers-repository.interface';

@Injectable()
export class DeleteFarmersUseCase {
  constructor(private readonly farmersRepository: FarmersRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.farmersRepository.delete(id);
  }
}
