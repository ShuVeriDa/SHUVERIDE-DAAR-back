import { NotFoundException } from '@nestjs/common';

export const getOneFood = async (id: string, foodName: string, repos: any) => {
  await repos.repository
    .createQueryBuilder(foodName)
    .whereInIds(id)
    .update()
    .set({ views: () => 'views + 1' })
    .execute();

  const food = await repos.repository.findOneBy({ id: id });

  if (!food) throw new NotFoundException(`${foodName} not found`);

  return food;
};
