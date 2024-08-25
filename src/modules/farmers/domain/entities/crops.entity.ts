import { BaseEntity } from '../../../../common/entity/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('crops')
export class CropsEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açúcar'],
  })
  name: string;
}
