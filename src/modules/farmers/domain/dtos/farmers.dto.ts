import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  Min,
  ArrayNotEmpty,
  IsIn,
} from 'class-validator';

export class CreateFarmerDto {
  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['CPF', 'CNPJ'])
  documentType: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  farmName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @Min(0)
  totalArea: number;

  @IsNumber()
  @Min(0)
  arableArea: number;

  @IsNumber()
  @Min(0)
  vegetationArea: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  crops: string[];
}
