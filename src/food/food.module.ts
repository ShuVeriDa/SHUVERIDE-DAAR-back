import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { FoodEntity } from './entity/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity, UserEntity]), UserModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
