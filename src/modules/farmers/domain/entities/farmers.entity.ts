import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { CropsEntity } from './crops.entity';
import { BaseEntity } from '../../../../common/entity/base-entity';

@Entity('farmers')
export class FarmersEntity extends BaseEntity {
  @Column({ name: 'document', type: 'varchar', length: 20 })
  document: string;

  @Column({
    name: 'document_type',
    type: 'enum',
    enum: ['CPF', 'CNPJ'],
  })
  documentType: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'farm_name', type: 'varchar', length: 255 })
  farmName: string;

  @Column({ name: 'city', type: 'varchar', length: 255 })
  city: string;

  @Column({ name: 'state', type: 'varchar', length: 2 })
  state: string;

  @Column({ name: 'total_area', type: 'decimal' })
  totalArea: number;

  @Column({ name: 'arable_area', type: 'decimal' })
  arableArea: number;

  @Column({ name: 'vegetation_area', type: 'decimal' })
  vegetationArea: number;
}
