import { FarmersDto } from '../dtos/farmers.dto';
import { FarmersEntity } from '../entities/farmers.entity';

export interface FarmersRepositoryInterface {
  create(dto: FarmersDto): Promise<void>;
  update(id: string, dto: FarmersDto): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<FarmersEntity | undefined>;
  findAll(): Promise<FarmersEntity[]>;
  getFarmersCount(): Promise<number>;
  getTotalArea(): Promise<number>;
  getFarmersByState(): Promise<{ state: string; count: number }[]>;
  getCropsDistribution(): Promise<{ crop: string; count: number }[]>;
  getLandUsage(): Promise<{ arableArea: number; vegetationArea: number }>;
}
