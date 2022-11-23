import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from '../../comment/entity/comment.entity';
import { PizzaEntity } from '../../pizza/entity/pizza.entity';
import { DrinkEntity } from '../../drink/entity/drink.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    eager: false,
    nullable: true,
  })
  comments: CommentEntity[];

  @Column({
    unique: true,
  })
  nickName?: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin?: boolean;

  @ManyToMany(() => PizzaEntity)
  @JoinTable()
  favorites: PizzaEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
