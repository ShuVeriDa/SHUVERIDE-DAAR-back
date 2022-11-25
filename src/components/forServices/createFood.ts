export const createFood = async (
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
  const food = await repos.foodRepository.save({
    title,
    imageUrl,
    price,
    kind,
    category,
    liters,
    types,
    sizes,
  });

  return repos.foodRepository.findOneBy({ id: food.id });
};
