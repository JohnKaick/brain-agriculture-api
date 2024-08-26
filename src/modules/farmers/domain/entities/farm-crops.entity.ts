import { BaseEntity } from 'src/common/entity/base-entity';
import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { CropsEntity } from './crops.entity';
import { FarmersEntity } from './farmers.entity';

@Entity('farm_crops')
@Unique(['farmerId', 'cropId'])
export class FarmCropsEntity extends BaseEntity {
  @Column({ name: 'farmer_id' })
  farmerId: string;

  @ManyToOne(() => FarmersEntity)
  @JoinColumn({ name: 'farmer_id' })
  farmer: FarmersEntity;

  @Column({ name: 'crop_id' })
  cropId: string;

  @ManyToOne(() => CropsEntity)
  @JoinColumn({ name: 'crop_id' })
  crop: CropsEntity;
}
