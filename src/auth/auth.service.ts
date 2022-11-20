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
import { genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
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

  async register(dto: AuthDto) {
    const oldUser = await this.repository.findOneBy({ email: dto.email });

    if (oldUser)
      throw new BadRequestException(
        'User with this email is already in the system',
      );

    const salt = await genSalt(10);

    const user = await this.repository.save({
      nickName: dto.nickName,
      email: dto.email,
      password: await hash(dto.password, salt),
      isAdmin: false,
    });

    const tokens = await this.issueTokenPair(String(user.id));

    try {
      return {
        user: this.returnUserFields(user),
        ...tokens,
      };
    } catch (error) {
      throw new ForbiddenException('Registration error.');
    }
  }

  async issueTokenPair(userId: string) {
    const data = { id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1d',
    });

    return { refreshToken, accessToken };
  }

  returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      nickName: user.nickName,
    };
  }
}
