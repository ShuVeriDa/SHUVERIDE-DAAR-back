import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DrinkService } from './drink.service';
import { CreateDrinkDto } from './dto/createDrink.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get()
  findAll() {
    return this.drinkService.findAll();
  }

  @Get(':id')
  @Auth('admin')
  findOne(@Param('id') id: string) {
    return this.drinkService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  create(@Body() createDrinkDto: CreateDrinkDto) {
    return this.drinkService.create(createDrinkDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  update(@Param('id') id: string, @Body() dto: CreateDrinkDto) {
    return this.drinkService.update(id, dto);
  }

  @Delete(':id')
  @Auth('admin')
  delete(@Param('id') id: string) {
    return this.drinkService.delete(id);
  }
}
