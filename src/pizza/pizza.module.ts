import { Module } from '@nestjs/common';
import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaEntity } from './entity/pizza.entity';
import { UserEntity } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PizzaEntity, UserEntity]), UserModule],
  controllers: [PizzaController],
  providers: [PizzaService],
})
export class PizzaModule {}
