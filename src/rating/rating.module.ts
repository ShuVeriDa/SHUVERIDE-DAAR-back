import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entity/rating.entity';
import { UserEntity } from '../user/entity/user.entity';
import { FoodEntity } from '../food/entity/food.entity';
import { FoodService } from '../food/food.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity, FoodEntity, UserEntity])],
  controllers: [RatingController],
  providers: [RatingService, FoodService],
})
export class RatingModule {}
