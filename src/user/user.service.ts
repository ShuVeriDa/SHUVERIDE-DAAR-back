import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.repository.find();

    return users.map((obj) => {
      delete obj.comments;
      delete obj.password;
      delete obj.favorites;
      return obj;
    });

    // const users = await this.repository.find({
    //   relations: ['comments', 'favorites'],
    // });
    //
    // return users.map((obj) => {
    //   delete obj.comments;
    //   delete obj.password;
    //   delete obj.favorites;
    //   return obj;
    // });
  }

  async getById(id: string) {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    delete user.password;
    return user;

    // const user = await this.repository.findOne({
    //   where: { id: id },
    //   relations: ['favorites', 'comments'],
    // });
    //
    // if (!user) throw new NotFoundException('User not found');
    //
    // delete user.comments;
    // delete user.favorites;
    // delete user.password;
    //
    // return user;
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('User not found');

    await this.repository.update(
      { id: userId },
      {
        email: dto.email,
        nickName: dto.nickName,
        isAdmin: dto.isAdmin,
        avatar: dto.avatar,
      },
    );

    return this.getById(userId);
  }

  async removeUser(userId: string) {
    return await this.repository.delete({ id: userId });
  }
}
