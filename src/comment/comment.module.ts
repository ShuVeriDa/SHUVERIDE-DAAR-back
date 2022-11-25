import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { PizzaModule } from '../pizza/pizza.module';
import { DrinkModule } from '../drink/drink.module';
import { PizzaService } from '../pizza/pizza.service';
import { FoodModule } from '../food/food.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    PizzaModule,
    DrinkModule,
    FoodModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
