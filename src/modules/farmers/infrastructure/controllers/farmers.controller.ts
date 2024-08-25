import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { FarmersDto } from '../../domain/dtos/farmers.dto';
import { CreateFarmersUseCase } from '../../application/create-farmers/create-farmers.usecase';
import { DeleteFarmersUseCase } from '../../application/delete-farmers/delete-farmers.use.case';
import { UpdateFarmersUseCase } from '../../application/update-farmers/update-farmers.usecase';
import { GetDashboardDataUseCase } from '../../application/get-dashboard-data/get-dashboard-data.usecase';

@Controller('farmers')
export class FarmersController {
  constructor(
    private readonly createFarmersUseCase: CreateFarmersUseCase,
    private readonly updateFarmersUseCase: UpdateFarmersUseCase,
    private readonly deleteFarmersUseCase: DeleteFarmersUseCase,
    private readonly getDashboardDataUseCase: GetDashboardDataUseCase,
  ) {}

  @Post()
  async create(@Body() createFarmersDto: FarmersDto): Promise<void> {
    await this.createFarmersUseCase.execute(createFarmersDto);
  }

  @Put(':id')
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

  @Get('dashboard')
  async getDashboardData(): Promise<any> {
    return this.getDashboardDataUseCase.execute();
  }
}
