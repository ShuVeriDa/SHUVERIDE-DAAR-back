import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FoodEntity } from '../../food/entity/food.entity';

export const getOneByKind = async (
  id: string,
  foodName: string,
  repos: Repository<FoodEntity>,
  kind?: 0 | 1,
) => {
  const food = await repos.findOneBy({ id });

  if (!food) throw new NotFoundException(`${foodName} not found`);

  if (kind === 0) {
    const pizza = food.kind === 0;
    if (!pizza) throw new NotFoundException(`This food is not pizza`);
  }

  if (kind === 1) {
    const drink = food.kind === 1;
    if (!drink) throw new NotFoundException(`This food is not drink`);
  }

  await repos
    .createQueryBuilder(foodName)
    .whereInIds(id)
    .update()
    .set({ views: () => 'views + 1' })
    .execute();

  return food;
};
