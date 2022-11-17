import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzaEntity } from './entity/pizza.entity';
import { Repository } from 'typeorm';
import { CreatePizzaDto } from './dto/createPizza.dto';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(PizzaEntity)
    private readonly repository: Repository<PizzaEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async create(dto: CreatePizzaDto) {
    await this.repository.save({
      title: dto.title,
      imageUrl: dto.imageUrl,
      // types: dto.types,
      // sizes: dto.sizes,
      price: dto.price,
      category: dto.category,
      rating: dto.rating,
    });

    return this.repository.findOneBy({ id: dto.id });
  }
}
