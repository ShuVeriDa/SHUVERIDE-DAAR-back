import { NotFoundException } from '@nestjs/common';

export const getOneFood = async (id: string, foodName: string, repos: any) => {
  const pizza = repos.repository.findOneBy({ id: id });

  await repos.repository
    .createQueryBuilder(foodName)
    .whereInIds(id)
    .update()
    .set({ views: () => 'views + 1' })
    .execute();

  if (!pizza) throw new NotFoundException(`${foodName} not found`);
  return pizza;
};
