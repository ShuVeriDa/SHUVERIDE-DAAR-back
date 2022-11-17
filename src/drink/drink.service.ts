import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrinkEntity } from './entity/drink.entity';
import { Repository } from 'typeorm';
import { CreateDrinkDto } from './dto/createDrink.dto';

@Injectable()
export class DrinkService {
  constructor(
    @InjectRepository(DrinkEntity)
    private readonly repository: Repository<DrinkEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async create(dto: CreateDrinkDto) {
    await this.repository.save({
      title: dto.title,
      imageUrl: dto.imageUrl,
      liters: dto.liters,
      price: dto.price,
      category: dto.category,
      rating: dto.rating,
    });

    return this.repository.findOneBy({ id: dto.id });
  }
}
