import { Repository } from 'typeorm';
import { FoodEntity } from '../../food/entity/food.entity';

export const createFood = async (
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
  const food = await repos.save({
    title,
    imageUrl,
    price,
    kind,
    category,
    liters,
    types,
    sizes,
  });

  return repos.findOneBy({ id: food.id });
};
