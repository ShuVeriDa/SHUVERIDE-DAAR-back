import { NotFoundException } from '@nestjs/common';

export const getOneFood = async (id: string, foodName: string, repos: any) => {
  const pizza = await repos.repository.findOneBy({ id: id });
  if (!pizza) throw new NotFoundException(`${foodName} not found`);
  return pizza;
};
