import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('drink')
export class DrinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
