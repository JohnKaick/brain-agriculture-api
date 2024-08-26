import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmersEntity } from '../../domain/entities/farmers.entity';
import { FarmersRepositoryInterface } from '../../domain/interfaces/farmers-repository.interface';
import { FarmersDto } from '../../domain/dtos/farmers.dto';

@Injectable()
export class FarmersRepository implements FarmersRepositoryInterface {
  constructor(
    @InjectRepository(FarmersEntity)
    private readonly farmerRepository: Repository<FarmersEntity>,
  ) {}

  async create(data: Record<string, any>): Promise<void> {
    const queryRunner =
      this.farmerRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const sqlInsertFarmer = `
        INSERT INTO farmers (id, document, document_type, name, farm_name, city, state, total_area, arable_area, vegetation_area)
        VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
      `;
      const result = await queryRunner.query(sqlInsertFarmer, [
        data.document,
        data.documentType,
        data.name,
        data.farmName,
        data.city,
        data.state,
        data.totalArea,
        data.arableArea,
        data.vegetationArea,
      ]);
      const farmerId = result[0].id;

      for (const crop of data.crops) {
        const sqlInsertCrop = `
          INSERT INTO crops (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id;
        `;
        let cropResult = await queryRunner.query(sqlInsertCrop, [crop]);
        let cropId = cropResult[0]?.id;

        if (!cropId) {
          const sqlSelectCrop = `
            SELECT id FROM crops WHERE name = $1;
          `;
          cropResult = await queryRunner.query(sqlSelectCrop, [crop]);
          cropId = cropResult[0]?.id;
        }

        if (cropId) {
          const sqlInsertFarmCrop = `
            INSERT INTO farm_crops (farmer_id, crop_id) VALUES ($1, $2)
            ON CONFLICT (farmer_id, crop_id) DO NOTHING;
          `;
          await queryRunner.query(sqlInsertFarmCrop, [farmerId, cropId]);
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: string, data: Record<string, any>): Promise<void> {
    const queryRunner =
      this.farmerRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const sqlUpdateFarmer = `
        UPDATE farmers
        SET document = $1, document_type = $2, name = $3, farm_name = $4, city = $5, state = $6, total_area = $7, arable_area = $8, vegetation_area = $9
        WHERE id = $10;
      `;
      await queryRunner.query(sqlUpdateFarmer, [
        data.document,
        data.documentType,
        data.name,
        data.farmName,
        data.city,
        data.state,
        data.totalArea,
        data.arableArea,
        data.vegetationArea,
        id,
      ]);

      const sqlDeleteFarmCrops = `
        DELETE FROM farm_crops WHERE farmer_id = $1;
      `;
      await queryRunner.query(sqlDeleteFarmCrops, [id]);

      for (const crop of data.crops) {
        const sqlInsertCrop = `
          INSERT INTO crops (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id;
        `;
        let cropResult = await queryRunner.query(sqlInsertCrop, [crop]);
        let cropId = cropResult[0]?.id;

        if (!cropId) {
          const sqlSelectCrop = `
            SELECT id FROM crops WHERE name = $1;
          `;
          cropResult = await queryRunner.query(sqlSelectCrop, [crop]);
          cropId = cropResult[0]?.id;
        }

        if (cropId) {
          const sqlInsertFarmCrop = `
            INSERT INTO farm_crops (farmer_id, crop_id) VALUES ($1, $2)
            ON CONFLICT (farmer_id, crop_id) DO NOTHING;
          `;
          await queryRunner.query(sqlInsertFarmCrop, [id, cropId]);
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: string): Promise<void> {
    const sql = `
      UPDATE farmers
      SET deleted_at = NOW()
      WHERE id = $1;
    `;
    await this.farmerRepository.query(sql, [id]);
  }

  async findById(id: string): Promise<FarmersDto> {
    const sql = `
      SELECT 
        f.id, 
        f.document, 
        f.document_type as "documentType", 
        f.name, 
        f.farm_name as "farmName", 
        f.city, 
        f.state, 
        f.total_area as "totalArea", 
        f.arable_area as "arableArea", 
        f.vegetation_area as "vegetationArea", 
        json_agg(c.name) as crops
      FROM 
        farmers f
      LEFT JOIN 
        farm_crops fc ON f.id = fc.farmer_id
      LEFT JOIN 
        crops c ON fc.crop_id = c.id
      WHERE 
        f.deleted_at IS NULL AND f.id = $1
      GROUP BY 
        f.id;
    `;

    const result = await this.farmerRepository.query(sql, [id]);
    return result[0];
  }
  async findAll(): Promise<FarmersDto[]> {
    const sql = `
      SELECT 
        f.id, 
        f.document, 
        f.document_type as "documentType", 
        f.name, 
        f.farm_name as "farmName", 
        f.city, 
        f.state, 
        f.total_area as "totalArea", 
        f.arable_area as "arableArea", 
        f.vegetation_area as "vegetationArea", 
        json_agg(c.name) as crops
      FROM 
        farmers f
      LEFT JOIN 
        farm_crops fc ON f.id = fc.farmer_id
      LEFT JOIN 
        crops c ON fc.crop_id = c.id
      WHERE 
        f.deleted_at IS NULL
      GROUP BY 
        f.id
      ORDER BY 
        f.name ASC;
    `;

    return await this.farmerRepository.query(sql);
  }

  async getFarmersCount(): Promise<number> {
    const sql = `
      SELECT COUNT(*) AS count FROM farmers WHERE deleted_at IS NULL;
    `;
    const result = await this.farmerRepository.query(sql);
    return parseInt(result[0].count, 10);
  }

  async getTotalArea(): Promise<number> {
    const sql = `
      SELECT SUM(total_area) AS totalarea 
      FROM farmers 
      WHERE deleted_at IS NULL;
    `;
    const result = await this.farmerRepository.query(sql);
    return parseFloat(result[0].totalarea);
  }

  async getFarmersByState(): Promise<{ state: string; count: number }[]> {
    const sql = `
      SELECT state, COUNT(id) AS count FROM farmers WHERE deleted_at IS NULL GROUP BY state;
    `;
    return await this.farmerRepository.query(sql);
  }

  async getCropsDistribution(): Promise<{ crop: string; count: number }[]> {
    const sql = `
      SELECT crops.name AS crop, COUNT(crops.id) AS count
      FROM farmers
      LEFT JOIN farm_crops ON farmers.id = farm_crops.farmer_id
      LEFT JOIN crops ON farm_crops.crop_id = crops.id
      WHERE farmers.deleted_at IS NULL
      GROUP BY crops.name;
    `;
    return await this.farmerRepository.query(sql);
  }

  async getLandUsage(): Promise<{
    arableArea: number;
    vegetationArea: number;
  }> {
    const sql = `
      SELECT SUM(arable_area) AS arablearea, SUM(vegetation_area) AS vegetationarea
      FROM farmers
      WHERE deleted_at IS NULL;
    `;
    const result = await this.farmerRepository.query(sql);
    return {
      arableArea: parseFloat(result[0].arablearea),
      vegetationArea: parseFloat(result[0].vegetationarea),
    };
  }
}
