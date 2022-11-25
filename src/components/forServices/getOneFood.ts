import { NotFoundException } from '@nestjs/common';

export const getOneFood = async (id: string, foodName: string, repos: any) => {
  const food = await repos.foodRepository.findOneBy({ id });

  if (!food) throw new NotFoundException(`${foodName} not found`);

  await repos.foodRepository
    .createQueryBuilder(foodName)
    .whereInIds(id)
    .update()
    .set({ views: () => 'views + 1' })
    .execute();

  return food;
};
