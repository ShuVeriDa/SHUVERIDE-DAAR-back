import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    return {
      user: this.returnUserFields(user),
    };
  }

  findByCond(cond: FindOptionsWhere<UserEntity>) {
    return this.repository.findOneBy(cond);
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByCond({
      email: email,
      password: password,
    });
    if (!user) throw new UnauthorizedException('Email or Password inValid');

    return user;
  }

  returnUserFields(user: UserEntity) {
    return {
      _id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      nickName: user.nickName,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.repository.findOneBy({ email: dto.email });

    if (oldUser)
      throw new BadRequestException(
        'User with this email is already in the system',
      );

    try {
      return await this.repository.save({
        nickName: dto.nickName,
        email: dto.email,
        password: dto.password,
        isAdmin: false,
      });
    } catch (error) {
      throw new ForbiddenException('Registration error.');
    }
  }
}
