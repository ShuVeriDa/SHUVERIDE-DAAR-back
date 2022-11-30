import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  getNewTokens(@Body() data: RefreshTokenDto) {
    return this.authService.getNewTokens(data);
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }
}
