import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FoodEntity } from '../../food/entity/food.entity';

export const deleteFood = async (
  id: string,
  foodName: string,
  repos: Repository<FoodEntity>,
) => {
  const food = await repos.findOneBy({ id });
  if (!food) throw new NotFoundException(`${foodName} not found`);
  return await repos.delete(id);
};
