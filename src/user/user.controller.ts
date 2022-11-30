import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthDto } from '../auth/dto/auth.dto';
import { UpdateUserDto } from './dto/update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth('admin')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
