import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmersEntity } from '../../domain/entities/farmers.entity';
import { FarmersDto } from '../../domain/dtos/farmers.dto';
import { FarmersRepositoryInterface } from '../../domain/interfaces/farmers-repository.interface';

@Injectable()
export class FarmersRepository implements FarmersRepositoryInterface {
  constructor(
    @InjectRepository(FarmersEntity)
    private readonly farmerRepository: Repository<FarmersEntity>,
  ) {}

  async create(dto: FarmersDto): Promise<void> {
    const sql = `
      INSERT INTO farmers (id, document, documentType, name, farmName, city, state, totalArea, arableArea, vegetationArea, createdAt, updatedAt)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW());
    `;
    await this.farmerRepository.query(sql, [
      dto.document,
      dto.documentType,
      dto.name,
      dto.farmName,
      dto.city,
      dto.state,
      dto.totalArea,
      dto.arableArea,
      dto.vegetationArea,
    ]);
  }

  async update(id: string, dto: FarmersDto): Promise<void> {
    const sql = `
      UPDATE farmers
      SET document = $1, documentType = $2, name = $3, farmName = $4, city = $5, state = $6, totalArea = $7, arableArea = $8, vegetationArea = $9, updatedAt = NOW()
      WHERE id = $10;
    `;
    await this.farmerRepository.query(sql, [
      dto.document,
      dto.documentType,
      dto.name,
      dto.farmName,
      dto.city,
      dto.state,
      dto.totalArea,
      dto.arableArea,
      dto.vegetationArea,
      id,
    ]);
  }

  async delete(id: string): Promise<void> {
    const sql = `
      UPDATE farmers
      SET deletedAt = NOW()
      WHERE id = $1;
    `;
    await this.farmerRepository.query(sql, [id]);
  }

  async findById(id: string): Promise<FarmersEntity | undefined> {
    const sql = `
      SELECT farmers.*, crops.*
      FROM farmers
      LEFT JOIN farm_crops ON farmers.id = farm_crops.farmerId
      LEFT JOIN crops ON farm_crops.cropId = crops.id
      WHERE farmers.id = $1 AND farmers.deletedAt IS NULL;
    `;
    const result = await this.farmerRepository.query(sql, [id]);
    return result.length ? result[0] : undefined;
  }

  async findAll(): Promise<FarmersEntity[]> {
    const sql = `
      SELECT farmers.*, crops.*
      FROM farmers
      LEFT JOIN farm_crops ON farmers.id = farm_crops.farmerId
      LEFT JOIN crops ON farm_crops.cropId = crops.id
      WHERE farmers.deletedAt IS NULL;
    `;
    return await this.farmerRepository.query(sql);
  }

  async getFarmersCount(): Promise<number> {
    const sql = `
      SELECT COUNT(*) AS count FROM farmers WHERE deletedAt IS NULL;
    `;
    const result = await this.farmerRepository.query(sql);
    return parseInt(result[0].count, 10);
  }

  async getTotalArea(): Promise<number> {
    const sql = `
      SELECT SUM(totalArea) AS totalArea FROM farmers WHERE deletedAt IS NULL;
    `;
    const result = await this.farmerRepository.query(sql);
    return parseFloat(result[0].totalArea);
  }

  async getFarmersByState(): Promise<{ state: string; count: number }[]> {
    const sql = `
      SELECT state, COUNT(id) AS count FROM farmers WHERE deletedAt IS NULL GROUP BY state;
    `;
    return await this.farmerRepository.query(sql);
  }

  async getCropsDistribution(): Promise<{ crop: string; count: number }[]> {
    const sql = `
      SELECT crops.name AS crop, COUNT(crops.id) AS count
      FROM farmers
      LEFT JOIN farm_crops ON farmers.id = farm_crops.farmerId
      LEFT JOIN crops ON farm_crops.cropId = crops.id
      WHERE farmers.deletedAt IS NULL
      GROUP BY crops.name;
    `;
    return await this.farmerRepository.query(sql);
  }

  async getLandUsage(): Promise<{
    arableArea: number;
    vegetationArea: number;
  }> {
    const sql = `
      SELECT SUM(arableArea) AS arableArea, SUM(vegetationArea) AS vegetationArea
      FROM farmers
      WHERE deletedAt IS NULL;
    `;
    const result = await this.farmerRepository.query(sql);
    return {
      arableArea: parseFloat(result[0].arableArea),
      vegetationArea: parseFloat(result[0].vegetationArea),
    };
  }
}
