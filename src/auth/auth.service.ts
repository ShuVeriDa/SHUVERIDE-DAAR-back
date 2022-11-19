import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

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
