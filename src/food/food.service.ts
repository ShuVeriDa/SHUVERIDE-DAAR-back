import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { getOneFood } from "../components/forServices/getOneFood";
import { createFood } from "../components/forServices/createFood";
import { updateFood } from "../components/forServices/updateFood";
import { deleteFood } from "../components/forServices/deleteFood";
import { FoodEntity } from "./entity/food.entity";
import { CreateFoodDto } from "./dto/CreateFood.dto";
import { SearchFoodDto } from "./dto/search.dto";
import { getOneByKind } from "../components/forServices/getOneByKind";

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async findAll() {
    return await this.foodRepository.find({
      order: {
        rating: "DESC"
      }
    });
  }

  async search(dto: SearchFoodDto) {
    const qb = this.foodRepository.createQueryBuilder("foods");

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 100);

    if (dto.title) {
      qb.andWhere("foods.title ILIKE :title");
    }

    if (dto.kind) {
      qb.andWhere("foods.kind = :kind", { kind: dto.kind });
    }

    if (dto.category) {
      qb.andWhere("foods.category = :category", { category: dto.category });
    }

    if (dto.views) {
      qb.orderBy("views", dto.views);
    }

    if (dto.price) {
      qb.orderBy("price", dto.price);
    }

    if (dto.rating) {
      qb.orderBy("rating", dto.rating);
    }

    if (dto.favorites) {
      qb.orderBy("favorites", dto.favorites);
    }

    qb.setParameters({
      title: `%${dto.title}%`,
      kind: dto.kind,
      category: dto.category,
      views: dto.views || "DESC",
      price: dto.price || "DESC",
      rating: dto.rating || "DESC",
      favorites: dto.favorites || "DESC"
    });

    const [foods, total] = await qb.getManyAndCount();

    return { foods, total };
  }

  async findOne(id: string) {
    return getOneByKind(id, "foods", this.foodRepository);
  }

  async findOnePizza(id: string) {
    return getOneByKind(id, "foods", this.foodRepository, 0);
  }

  async findOneDrink(id: string) {
    return getOneByKind(id, "foods", this.foodRepository, 1);
  }

  async create(dto: CreateFoodDto) {
    return createFood(
      dto.title,
      dto.imageUrl,
      dto.price,
      dto.kind,
      dto.category,
      this.foodRepository,
      dto.liters,
      dto.types,
      dto.sizes
    );
  }

  async update(id: string, dto: CreateFoodDto) {
    return updateFood(
      id,
      dto.title,
      dto.imageUrl,
      dto.price,
      dto.kind,
      dto.category,
      this.foodRepository,
      dto.liters,
      dto.types,
      dto.sizes
    );
  }

  async delete(id: string) {
    await deleteFood(id, "food", this.foodRepository);
  }

  async addToFavorites(id: string, userId: string) {
    const food = await getOneFood(id, "foods", this);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["favorites"]
    });

    const isNotFavorites =
      user.favorites.findIndex((obj) => obj.id === food.id) === -1;

    if (isNotFavorites) {
      user.favorites.push(food);
      food.favorites++;
      await this.userRepository.save(user);
      await this.foodRepository.save(food);
    }

    return food;
  }

  async removeFromFavorites(id: string, userId: string) {
    const food = await getOneFood(id, "foods", this);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["favorites"]
    });

    const pizzaIndex = user.favorites.findIndex((obj) => obj.id === food.id);

    if (pizzaIndex >= 0) {
      user.favorites.splice(pizzaIndex, 1);
      food.favorites--;
      await this.userRepository.save(user);
      await this.foodRepository.save(food);
    }

    return food;
  }

  async updateRating(id: string, newRating: number) {
    return this.foodRepository.update(
      { id },
      {
        rating: newRating
      }
    );
  }
}
