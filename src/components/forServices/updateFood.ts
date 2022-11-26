import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FoodEntity } from '../../food/entity/food.entity';

export const updateFood = async (
  id: string,
  title: string,
  imageUrl: string,
  price: number,
  kind: number,
  category: number,
  repos: Repository<FoodEntity>,
  liters?: number,
  types?: number[],
  sizes?: number[],
) => {
  const food = await repos.findOneBy({ id });
  if (!food) throw new NotFoundException(`Food not found`);

  const newFood = await repos.update(
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

  return await repos.findOneBy({ id });
};
