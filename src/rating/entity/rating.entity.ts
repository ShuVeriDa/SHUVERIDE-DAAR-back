import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { PizzaEntity } from '../../pizza/entity/pizza.entity';

@Entity('ratings')
export class RatingEntity {
  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  userId: string;

  @PrimaryGeneratedColumn('uuid')
  @ManyToOne(() => PizzaEntity, (pizza) => pizza.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'pizzaId' })
  pizzaId: string;

  @Column()
  value: number;
}
