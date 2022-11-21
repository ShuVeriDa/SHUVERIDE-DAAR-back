import { NotFoundException } from '@nestjs/common';

export const updateFood = async (
  id,
  title: string,
  imageUrl: string,
  price: number,
  category: number,
  rating: number,
  repos: any,
  liters?: number,
) => {
  const food = await repos.repository.findOneBy({ id });
  if (!food) throw new NotFoundException(`Pizza not found`);

  const newPizza = await repos.repository.update(
    { id },
    {
      title,
      imageUrl,
      price,
      category,
      rating,
      liters,
    },
  );

  return await repos.repository.findOneBy({ id });
};
