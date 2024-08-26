import { Injectable, BadRequestException } from '@nestjs/common';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class FarmersValidationCpfCnpjUseCase {
  validateDocument(document: string, documentType: 'CPF' | 'CNPJ'): void {
    if (documentType === 'CPF') {
      if (!cpf.isValid(document)) {
        throw new BadRequestException('Invalid CPF number.');
      }
    } else if (documentType === 'CNPJ') {
      if (!cnpj.isValid(document)) {
        throw new BadRequestException('Invalid CNPJ number.');
      }
    } else {
      throw new BadRequestException('Invalid document type.');
    }
  }

  determineDocumentType(document: string): 'CPF' | 'CNPJ' {
    const cleanedDocument = document.replace(/\D/g, '');
    if (cleanedDocument.length === 11) {
      return 'CPF';
    } else if (cleanedDocument.length === 14) {
      return 'CNPJ';
    } else {
      throw new BadRequestException('Invalid document length.');
    }
  }
}
