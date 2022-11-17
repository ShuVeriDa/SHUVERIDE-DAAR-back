import { Module } from '@nestjs/common';
import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaEntity } from './entity/pizza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PizzaEntity])],
  controllers: [PizzaController],
  providers: [PizzaService],
})
export class PizzaModule {}
