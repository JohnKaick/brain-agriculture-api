import { BaseEntity } from '../../../../common/entity/base-entity';
import { Entity, Column } from 'typeorm';

@Entity('crops')
export class CropsEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, unique: true })
  name: string;
}
