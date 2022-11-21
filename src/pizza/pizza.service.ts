import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzaEntity } from './entity/pizza.entity';
import { Repository } from 'typeorm';
import { CreatePizzaDto } from './dto/createPizza.dto';
import { getOneFood } from '../components/getFood';
import { createFood } from '../components/createFood';
import { deleteFood } from '../components/deleteFood';
import { updateFood } from '../components/updateFood';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(PizzaEntity)
    private readonly repository: Repository<PizzaEntity>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return getOneFood(id, 'pizza', this);
  }

  async create(dto: CreatePizzaDto) {
    return createFood(
      dto.title,
      dto.imageUrl,
      dto.price,
      dto.category,
      dto.rating,
      this,
    );
  }

  async update(id: string, dto: CreatePizzaDto) {
    return updateFood(
      id,
      dto.title,
      dto.imageUrl,
      dto.price,
      dto.category,
      dto.rating,
      this,
    );
  }

  async delete(id: string) {
    await deleteFood(id, 'pizza', this.repository);
  }

  async popular() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views', 'DESC');
    qb.limit(10);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
    };
  }
}
