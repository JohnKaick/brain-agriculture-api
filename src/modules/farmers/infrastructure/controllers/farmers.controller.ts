import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Patch,
} from '@nestjs/common';
import { FarmersDto } from '../../domain/dtos/farmers.dto';
import { CreateFarmersUseCase } from '../../application/create-farmers/create-farmers.usecase';
import { DeleteFarmersUseCase } from '../../application/delete-farmers/delete-farmers.use.case';
import { UpdateFarmersUseCase } from '../../application/update-farmers/update-farmers.usecase';
import { GetDashboardDataUseCase } from '../../application/get-dashboard-data/get-dashboard-data.usecase';
import { GetFarmersUseCase } from '../../application/get-farmers/get-farmers.usecase';

@Controller('farmers')
export class FarmersController {
  constructor(
    private readonly createFarmersUseCase: CreateFarmersUseCase,
    private readonly updateFarmersUseCase: UpdateFarmersUseCase,
    private readonly deleteFarmersUseCase: DeleteFarmersUseCase,
    private readonly getFarmersUseCase: GetFarmersUseCase,
    private readonly getDashboardDataUseCase: GetDashboardDataUseCase,
  ) {}

  @Post()
  async create(@Body() createFarmersDto: FarmersDto): Promise<void> {
    await this.createFarmersUseCase.execute(createFarmersDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFarmersDto: FarmersDto,
  ): Promise<void> {
    await this.updateFarmersUseCase.execute(id, updateFarmersDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteFarmersUseCase.execute(id);
  }

  @Get('/')
  async getAll(): Promise<Record<string, any>[]> {
    return this.getFarmersUseCase.execute();
  }

  @Get('/dashboard')
  async getDashboardData(): Promise<any> {
    return this.getDashboardDataUseCase.execute();
  }
}
