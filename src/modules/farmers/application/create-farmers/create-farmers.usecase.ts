import { Injectable, BadRequestException } from '@nestjs/common';
import { FarmersValidationCpfCnpjUseCase } from '../farmers-validation-cpf-cnpj/farmers-validation-cpf-cnpj.usecase';
import { FarmersDto } from '../../domain/dtos/farmers.dto';
import { FarmersRepositoryInterface } from '../../domain/interfaces/farmers-repository.interface';

@Injectable()
export class CreateFarmersUseCase {
  constructor(
    private readonly farmersRepository: FarmersRepositoryInterface,
    private readonly farmerValidationUseCase: FarmersValidationCpfCnpjUseCase,
  ) {}

  async execute(dto: FarmersDto): Promise<void> {
    const documentType = this.farmerValidationUseCase.determineDocumentType(
      dto.document,
    );

    this.farmerValidationUseCase.validateDocument(dto.document, documentType);

    if (dto.arableArea + dto.vegetationArea > dto.totalArea) {
      throw new BadRequestException(
        'Arable area and vegetation area cannot exceed total area.',
      );
    }

    await this.farmersRepository.create({
      ...dto,
      documentType,
    });
  }
}
