import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { validationUser } from '../components/forServices/validationUserForComments';
import { getOneFood } from '../components/forServices/getOneFood';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(foodId: number) {
    const qb = this.commentRepository.createQueryBuilder('c');

    if (foodId) {
      qb.where('c.foodId = :foodId', { foodId });
    }

    const arr = await qb
      .leftJoinAndSelect('c.food', 'food')
      .leftJoinAndSelect('c.user', 'user')
      .getMany();

    console.log(arr);

    return arr.map((obj) => {
      delete obj.user.password;
      return {
        ...obj,
        food: { id: obj.food.id, title: obj.food.title },
      };
    });
  }

  async findOne(id: string) {
    // const comment = await this.repository.findOneBy({ id });
    // if (!comment) throw new NotFoundException('Comment not found');
    // return comment;

    const qb = this.commentRepository.createQueryBuilder('c');

    const arr = await qb
      .leftJoinAndSelect('c.food', 'food')
      .leftJoinAndSelect('c.user', 'user')
      .getMany();

    const comment = arr.find((obj) => obj.id === id);
    console.log(comment);

    if (!comment) {
      throw new NotFoundException('comment not found');
    }

    delete comment.user.password;
    return {
      ...comment,
      food: { id: comment.food.id, title: comment.food.title },
    };
  }

  async findByFoodId(foodId: string) {
    const qb = this.commentRepository.createQueryBuilder('c');

    const arr = await qb
      .leftJoinAndSelect('c.food', 'food')
      .leftJoinAndSelect('c.user', 'user')
      .getMany();

    const foods = arr
      .filter((obj) => obj.food.id === foodId)
      .map((obj) => {
        delete obj.user.password;
        return {
          ...obj,
          food: { id: obj.food.id, title: obj.food.title },
        };
      });

    return foods;
  }

  async create(dto: CreateCommentDto, userId: string) {
    const comment = await this.commentRepository.save({
      text: dto.text,
      food: { id: dto.foodId },
      user: { id: userId },
    });

    return this.findOne(comment.id);
  }

  async update(id: string, userId: string, dto: CreateCommentDto) {
    await validationUser(id, userId, this);

    await this.commentRepository.update(id, {
      text: dto.text,
      food: { id: dto.foodId },
      user: { id: userId },
    });

    return this.findOne(id);
  }

  async remove(id: string, userId: string) {
    await validationUser(id, userId, this);

    return await this.commentRepository.delete(id);
  }

  // async addToFavorites(id: string, userId: string) {
  //   const comment = await this.commentRepository.findOne({ where: { id: id } });
  //
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //     relations: ['favorites'],
  //   });
  //
  //   const isNotFavorites =
  //     user.favorites.findIndex((obj) => obj.id === comment.id) === -1;
  //
  //   if (isNotFavorites) {
  //     user.favorites.push(comment);
  //     comment.favorites++;
  //     await this.userRepository.save(user);
  //     await this.commentRepository.save(comment);
  //   }
  //
  //   return { comment: comment };
  // }

  // async removeFromFavorites(id: string, userId: string) {
  //   const food = await getOneFood(id, 'foods', this);
  //
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //     relations: ['favorites'],
  //   });
  //
  //   const pizzaIndex = user.favorites.findIndex((obj) => obj.id === food.id);
  //
  //   if (pizzaIndex >= 0) {
  //     user.favorites.splice(pizzaIndex, 1);
  //     food.favorites--;
  //     await this.userRepository.save(user);
  //     await this.commentRepository.save(food);
  //   }
  //
  //   return food;
  // }
}
