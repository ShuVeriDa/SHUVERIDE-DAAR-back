import { NotFoundException } from '@nestjs/common';

export const getOneByKind = async (
  id: string,
  foodName: string,
  repos: any,
  kind?: 0 | 1,
) => {
  const food = await repos.foodRepository.findOneBy({ id });

  if (!food) throw new NotFoundException(`${foodName} not found`);

  if (kind === 0) {
    const pizza = food.kind === 0;
    if (!pizza) throw new NotFoundException(`This food is not pizza`);
  }

  if (kind === 1) {
    const drink = food.kind === 1;
    if (!drink) throw new NotFoundException(`This food is not drink`);
  }

  await repos.foodRepository
    .createQueryBuilder(foodName)
    .whereInIds(id)
    .update()
    .set({ views: () => 'views + 1' })
    .execute();

  return food;
};
