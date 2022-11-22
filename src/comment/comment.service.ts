import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { validationUser } from '../components/validation';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  async findAll(foodId: number) {
    const qb = this.repository.createQueryBuilder('c');

    if (foodId) {
      qb.where('c.foodId = :foodId', { foodId });
    }

    const arr = await qb
      .leftJoinAndSelect('c.food', 'food')
      .leftJoinAndSelect('c.user', 'user')
      .getMany();

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

    const qb = this.repository.createQueryBuilder('c');

    const arr = await qb
      .leftJoinAndSelect('c.food', 'food')
      .leftJoinAndSelect('c.user', 'user')
      .getMany();

    const comment = arr.find((obj) => Number(obj.id) === Number(id));

    if (!comment) {
      throw new NotFoundException('comment not found');
    }

    delete comment.user.password;
    return {
      ...comment,
      food: { id: comment.food.id, title: comment.food.title },
    };
  }

  async create(dto: CreateCommentDto, userId: string) {
    const comment = await this.repository.save({
      text: dto.text,
      food: { id: dto.foodId },
      user: { id: userId },
    });

    return this.repository.findOneBy({ id: comment.id });
  }

  async update(id: string, userId: string, dto: CreateCommentDto) {
    await validationUser(id, userId, this);

    await this.repository.update(id, {
      text: dto.text,
      food: { id: dto.foodId },
      user: { id: userId },
    });

    return this.repository.findOneBy({ id });
  }

  async remove(id: string, userId: string) {
    await validationUser(id, userId, this);

    return this.repository.delete(id);
  }
}
