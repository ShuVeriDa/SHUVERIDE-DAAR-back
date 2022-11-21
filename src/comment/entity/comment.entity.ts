import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { PizzaEntity } from '../../pizza/entity/pizza.entity';
import { DrinkEntity } from '../../drink/entity/drink.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => UserEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => PizzaEntity || DrinkEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'foodId' })
  food: PizzaEntity | DrinkEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
