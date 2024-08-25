import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../../common/entity/base.entity';

@Entity('farm_crops')
export class FarmCropsEntity extends BaseEntity {
  @Column()
  farmerId: string;

  @Column()
  cropId: string;
}
