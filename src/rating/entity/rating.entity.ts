import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { FoodEntity } from '../../food/entity/food.entity';

@Entity('ratings')
export class RatingEntity {
  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  userId: string;

  @PrimaryGeneratedColumn('uuid')
  @ManyToOne(() => FoodEntity, (food) => food.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'foodId' })
  foodId: string;

  @Column()
  value: number;
}
