import { FarmersDto } from '../dtos/farmers.dto';

export interface FarmersRepositoryInterface {
  create(dto: Record<string, any>): Promise<void>;
  update(id: string, dto: Record<string, any>): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<FarmersDto>;
  findAll(): Promise<FarmersDto[]>;
  getFarmersCount(): Promise<number>;
  getTotalArea(): Promise<number>;
  getFarmersByState(): Promise<{ state: string; count: number }[]>;
  getCropsDistribution(): Promise<{ crop: string; count: number }[]>;
  getLandUsage(): Promise<{ arableArea: number; vegetationArea: number }>;
}
