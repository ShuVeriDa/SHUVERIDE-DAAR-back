import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PizzaEntity } from '../pizza/entity/pizza.entity';

export const deleteFood = async (
  id: string,
  foodName: string,
  repos: Repository<PizzaEntity>,
) => {
  const food = await repos.delete(id);
  if (!food) throw new NotFoundException(`${foodName} not found`);
  return food;
};
