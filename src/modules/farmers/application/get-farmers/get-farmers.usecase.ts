import { Injectable } from '@nestjs/common';
import { FarmersRepositoryInterface } from '../../domain/interfaces/farmers-repository.interface';
import { FarmersDto } from '../../domain/dtos/farmers.dto';

@Injectable()
export class GetFarmersUseCase {
  constructor(private readonly farmersRepository: FarmersRepositoryInterface) {}

  async execute(): Promise<Record<string, any>[]> {
    return this.farmersRepository.findAll();
  }
}
