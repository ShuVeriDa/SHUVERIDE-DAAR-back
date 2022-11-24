export const createFood = async (
  title: string,
  imageUrl: string,
  price: number,
  category: number,
  repos: any,
  liters?: number,
) => {
  const food = await repos.repository.save({
    title,
    imageUrl,
    // types: dto.types,
    // sizes: dto.sizes,
    liters,
    price,
    category,
  });

  return repos.repository.findOneBy({ id: food.id });
};
