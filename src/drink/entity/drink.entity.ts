import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('drink')
export class DrinkEntity {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ default: 4.0 })
  rating?: number;

  @Column({
    default: 0,
  })
  views: number;

  @Column({ default: 0 })
  favorites: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
