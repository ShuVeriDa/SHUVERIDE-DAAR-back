import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzaEntity } from './entity/pizza.entity';
import { Repository } from 'typeorm';
import { CreatePizzaDto } from './dto/createPizza.dto';
import { getOneFood } from '../components/getComponent';
import { createFood } from '../components/createFood';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(PizzaEntity)
    private readonly repository: Repository<PizzaEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    // const pizza = await this.repository.findOneBy({ id: id });
    // if (!pizza) throw new NotFoundException('Pizza not found');
    // return pizza;

    return getOneFood(id, 'Pizza', this);
  }

  async create(dto: CreatePizzaDto) {
    //   const pizza = await this.repository.save({
    //     title: dto.title,
    //     imageUrl: dto.imageUrl,
    //     // types: dto.types,
    //     // sizes: dto.sizes,
    //     price: dto.price,
    //     category: dto.category,
    //     rating: dto.rating,
    //   });
    //
    //   return this.repository.findOneBy({ id: pizza.id });
    // }

    return createFood(
      dto.title,
      dto.imageUrl,
      dto.price,
      dto.category,
      dto.rating,
      this,
    );
  }
}
