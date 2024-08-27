import { Injectable, BadRequestException } from '@nestjs/common';
import { FarmersValidationCpfCnpjUseCase } from '../farmers-validation-cpf-cnpj/farmers-validation-cpf-cnpj.usecase';
import { FarmersDto } from '../../domain/dtos/farmers.dto';
import { FarmersRepositoryInterface } from '../../domain/interfaces/farmers-repository.interface';

@Injectable()
export class UpdateFarmersUseCase {
  constructor(
    private readonly farmersRepository: FarmersRepositoryInterface,
    private readonly farmerValidationUseCase: FarmersValidationCpfCnpjUseCase,
  ) {}

  async execute(id: string, dto: FarmersDto): Promise<void> {
    const documentType = this.farmerValidationUseCase.determineDocumentType(
      dto.document,
    );

    this.farmerValidationUseCase.validateDocument(dto.document, documentType);

    if (dto.arableArea + dto.vegetationArea > dto.totalArea) {
      throw new BadRequestException(
        'Soma das áreas (Cultivável e Vegetação) não pode exceder a Área Total',
      );
    }

    await this.farmersRepository.update(id, {
      ...dto,
      documentType,
    });
  }
}
