import { NotFoundException } from '@nestjs/common';

export const updateFood = async (
  id: string,
  title: string,
  imageUrl: string,
  price: number,
  kind: number,
  category: number,
  repos: any,
  liters?: number,
  types?: number[],
  sizes?: number[],
) => {
  const food = await repos.foodRepository.findOneBy({ id });
  if (!food) throw new NotFoundException(`Food not found`);

  const newFood = await repos.foodRepository.update(
    { id },
    {
      title,
      imageUrl,
      price,
      kind,
      category,
      liters,
      types,
      sizes,
    },
  );

  return await repos.foodRepository.findOneBy({ id });
};
