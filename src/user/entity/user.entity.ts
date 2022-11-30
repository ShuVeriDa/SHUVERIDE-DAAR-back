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
import { FoodEntity } from '../../food/entity/food.entity';
import { IsOptional } from 'class-validator';

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

  // @ManyToMany(() => PizzaEntity)
  // @JoinTable()
  // favorites: PizzaEntity[];

  @ManyToMany(() => FoodEntity)
  @JoinTable()
  favorites: FoodEntity[];

  @Column({
    unique: true,
  })
  nickName?: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin?: boolean;

  @Column()
  avatar?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
