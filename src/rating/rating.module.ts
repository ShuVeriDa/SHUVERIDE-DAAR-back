import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entity/rating.entity';
import { PizzaModule } from '../pizza/pizza.module';
import { PizzaService } from '../pizza/pizza.service';
import { PizzaEntity } from '../pizza/entity/pizza.entity';
import { UserEntity } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity, PizzaEntity, UserEntity])],
  controllers: [RatingController],
  providers: [RatingService, PizzaService],
})
export class RatingModule {}
