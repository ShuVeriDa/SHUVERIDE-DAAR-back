import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { getOneFood } from '../components/forServices/getOneFood';
import { createFood } from '../components/forServices/createFood';
import { updateFood } from '../components/forServices/updateFood';
import { deleteFood } from '../components/forServices/deleteFood';
import { FoodEntity } from './entity/food.entity';
import { CreateFoodDto } from './dto/CreateFood.dto';
import { SearchFoodDto } from './dto/search.dto';
import { getOneByKind } from '../components/forServices/getOneByKind';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.foodRepository.find({
      order: {
        rating: 'DESC',
      },
    });
  }

  async search(dto: SearchFoodDto) {
    const qb = this.foodRepository.createQueryBuilder('food');

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    if (dto.title) {
      qb.andWhere('pizza.title ILIKE :title');
    }

    if (dto.views) {
      qb.orderBy('views', dto.views);
    }

    if (dto.price) {
      qb.orderBy('price', dto.price);
    }

    if (dto.rating) {
      qb.orderBy('rating', dto.rating);
    }

    if (dto.favorites) {
      qb.orderBy('favorites', dto.favorites);
    }

    qb.setParameters({
      title: `%${dto.title}%`,
      views: `%${dto.views}%`,
      price: `%${dto.price}%`,
      rating: `%${dto.rating}%`,
      favorites: `%${dto.favorites}%`,
    });

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async findOne(id: string) {
    return getOneByKind(id, 'foods', this);
  }

  async findOnePizza(id: string) {
    return getOneByKind(id, 'foods', this, 0);
  }

  async findOneDrink(id: string) {
    return getOneByKind(id, 'foods', this, 1);
  }

  async create(dto: CreateFoodDto) {
    return createFood(
      dto.title,
      dto.imageUrl,
      dto.price,
      dto.kind,
      dto.category,
      this,
      dto.liters,
      dto.types,
      dto.sizes,
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
      this,
      dto.liters,
      dto.types,
      dto.sizes,
    );
  }

  async delete(id: string) {
    await deleteFood(id, 'food', this.foodRepository);
  }

  async addToFavorites(id: string, userId: string) {
    // const pizza = await getOneFood(id, 'food', this);
    //
    // const user = await this.userRepository.findOne({
    //   where: { id: userId },
    //   relations: ['favorites'],
    // });
    //
    // const isNotFavorites =
    //   user.favorites.findIndex((obj) => obj.id === food.id) === -1;
    //
    // if (isNotFavorites) {
    //   user.favorites.push(pizza);
    //   pizza.favorites++;
    //   await this.userRepository.save(user);
    //   await this.foodRepository.save(pizza);
    // }
    //
    // return { pizza: pizza };
  }

  async removeFromFavorites(id: string, userId: string) {
    const pizza = await getOneFood(id, 'pizza', this);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    const pizzaIndex = user.favorites.findIndex((obj) => obj.id === pizza.id);

    if (pizzaIndex >= 0) {
      user.favorites.splice(pizzaIndex, 1);
      pizza.favorites--;
      await this.userRepository.save(user);
      await this.foodRepository.save(pizza);
    }

    return pizza;
  }

  async updateRating(id: string, newRating: number) {
    return this.foodRepository.update(
      { id },
      {
        rating: newRating,
      },
    );
  }
}
