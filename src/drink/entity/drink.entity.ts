import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('drink')
export class DrinkEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  imageUrl: string;

  @Column()
  title: string;

  @Column({ type: 'real' })
  liters: number;

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
