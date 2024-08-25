import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { CropsEntity } from './crops.entity';
import { BaseEntity } from '../../../../common/entity/base.entity';

@Entity('farmers')
export class FarmersEntity extends BaseEntity {
  @Column()
  document: string;

  @Column({
    type: 'enum',
    enum: ['CPF', 'CNPJ'],
  })
  documentType: string;

  @Column()
  name: string;

  @Column()
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('decimal')
  totalArea: number;

  @Column('decimal')
  arableArea: number;

  @Column('decimal')
  vegetationArea: number;

  @ManyToMany(() => CropsEntity, { cascade: true })
  @JoinTable({ name: 'farm_crops' })
  crops: CropsEntity[];
}
