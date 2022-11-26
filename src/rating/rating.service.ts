import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from './entity/rating.entity';
import { Repository } from 'typeorm';
import { SetRatingDto } from './dto/rating.dto';
import { PizzaService } from '../pizza/pizza.service';
import { FoodEntity } from '../food/entity/food.entity';
import { FoodService } from '../food/food.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
    private readonly foodService: FoodService,
  ) {}

  async setRating(userId: string, dto: SetRatingDto) {
    const { foodId, value } = dto;

    const newRating = await this.ratingRepository.update(
      { foodId: foodId },
      { value: value, userId: userId, foodId: foodId },
    );

    await this.foodService.updateRating(foodId, value);

    return newRating;
  }
}
