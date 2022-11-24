import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from './entity/rating.entity';
import { Repository } from 'typeorm';
import { SetRatingDto } from './dto/rating.dto';
import { PizzaEntity } from '../pizza/entity/pizza.entity';
import { PizzaService } from '../pizza/pizza.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @InjectRepository(PizzaEntity)
    private readonly pizzaRepository: Repository<PizzaEntity>,
    private readonly pizzaService: PizzaService,
  ) {}

  async setRating(userId: string, dto: SetRatingDto) {
    const { pizzaId, value } = dto;

    const newRating = await this.ratingRepository.update(
      { pizzaId: pizzaId },
      { value: value, userId: userId, pizzaId: pizzaId },
    );

    await this.pizzaService.updateRating(pizzaId, value);

    return newRating;
  }
}
