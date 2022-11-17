import { Module } from '@nestjs/common';
import { DrinkService } from './drink.service';
import { DrinkController } from './drink.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinkEntity } from './entity/drink.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrinkEntity])],
  providers: [DrinkService],
  controllers: [DrinkController],
})
export class DrinkModule {}
