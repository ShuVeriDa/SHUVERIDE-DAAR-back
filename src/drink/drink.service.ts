import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrinkEntity } from './entity/drink.entity';
import { Repository } from 'typeorm';
import { CreateDrinkDto } from './dto/createDrink.dto';
import { getOneFood } from '../components/getFood';
import { createFood } from '../components/createFood';
import { deleteFood } from '../components/deleteFood';
import { updateFood } from '../components/updateFood';

@Injectable()
export class DrinkService {
  constructor(
    @InjectRepository(DrinkEntity)
    private readonly repository: Repository<DrinkEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return getOneFood(id, 'drink', this);
  }

  async create(dto: CreateDrinkDto) {
    return createFood(
      dto.title,
      dto.imageUrl,
      dto.price,
      dto.category,
      dto.rating,
      this,
      dto.liters,
    );
  }

  async update(id: string, dto: CreateDrinkDto) {
    return updateFood(
      id,
      dto.title,
      dto.imageUrl,
      dto.price,
      dto.category,
      dto.rating,
      this,
      dto.liters,
    );
  }

  async delete(id: string) {
    await deleteFood(id, 'Drink', this.repository);
  }
}
