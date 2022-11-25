import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from '../../comment/entity/comment.entity';

@Entity('foods')
export class FoodEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  imageUrl: string;

  @Column()
  price: number;

  @Column()
  kind: number;

  @Column()
  category: number;

  @Column('int', { array: true, default: null })
  types?: number[];

  @Column('int', { array: true, default: null })
  sizes?: number[];

  @Column({ type: 'real', default: null })
  liters?: number;

  @Column({
    default: 0,
  })
  views: number;

  @Column({ default: 0 })
  favorites: number;

  @Column({ default: 4.0 })
  rating?: number;

  @OneToMany(() => CommentEntity, (comment) => comment.food, { eager: true })
  @JoinColumn()
  comments: CommentEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
