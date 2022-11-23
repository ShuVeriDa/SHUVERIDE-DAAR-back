import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from '../../comment/entity/comment.entity';

@Entity('pizza')
export class PizzaEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  imageUrl: string;

  @Column()
  title: string;

  // @Column()
  // types: number;
  //
  // @Column()
  // sizes: number;

  @Column()
  price: number;

  @Column()
  category: number;

  @Column()
  rating: number;

  @Column({
    default: 0,
  })
  views: number;

  @Column({ default: 0 })
  favoritesCount: number;

  @OneToMany(() => CommentEntity, (comment) => comment.food, { eager: true })
  @JoinColumn()
  comments: CommentEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
