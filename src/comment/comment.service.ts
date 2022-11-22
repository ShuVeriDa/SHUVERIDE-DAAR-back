import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

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

    return arr.map((obj) => {
      if (Number(obj.id) === Number(id)) {
        delete obj.user.password;
        return {
          ...obj,
          food: { id: obj.food.id, title: obj.food.title },
        };
      }

      throw new NotFoundException('Comment not found');
    });
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
    const comment = await this.findOne(id);
    const commentUserId = comment.find((obj) => obj.user.id === userId);

    if (!commentUserId) {
      throw new ForbiddenException('No access to this comment');
    }

    return this.repository.update(id, {
      text: dto.text,
      food: { id: dto.foodId },
      user: { id: userId },
    });
  }

  async remove(id: string, userId: string) {
    const comment = await this.findOne(id);
    const commentUserId = comment.find((obj) => obj.user.id === userId);

    if (!commentUserId) {
      throw new ForbiddenException('No access to this comment');
    }

    return this.repository.delete(id);
  }
}
