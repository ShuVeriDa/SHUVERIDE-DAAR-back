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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { SearchFoodDto } from './dto/search.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../user/decorators/user.decorator';
import { CreateFoodDto } from './dto/CreateFood.dto';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  //Joint

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get('/search')
  search(@Query() dto: SearchFoodDto) {
    return this.foodService.search(dto);
  }

  @Get(':id')
  @Auth('admin')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @Delete(':id')
  @Auth('admin')
  delete(@Param('id') id: string) {
    return this.foodService.delete(id);
  }

  @Post(':id/favorites')
  @Auth()
  async addToFavorites(@User('id') userId: string, @Param('id') id: string) {
    return await this.foodService.addToFavorites(id, userId);
  }

  @Delete(':id/favorites')
  @Auth()
  async deleteFromFavorites(
    @User('id') userId: string,
    @Param('id') id: string,
  ) {
    return await this.foodService.removeFromFavorites(id, userId);
  }

  //Pizza

  @Get('pizzas/:id')
  @Auth('admin')
  findOnePizza(@Param('id') id: string) {
    return this.foodService.findOnePizza(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('/pizzas')
  @HttpCode(200)
  @Auth('admin')
  createPizza(@Body() dto: CreateFoodDto) {
    return this.foodService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/pizzas/:id')
  @HttpCode(200)
  @Auth('admin')
  updatePizza(@Param('id') id: string, @Body() dto: CreateFoodDto) {
    return this.foodService.update(id, dto);
  }

  //Drink

  @Get('drinks/:id')
  @Auth('admin')
  findOneDrink(@Param('id') id: string) {
    return this.foodService.findOneDrink(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('/drinks')
  @HttpCode(200)
  @Auth('admin')
  createDrink(@Body() dto: CreateFoodDto) {
    return this.foodService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/drinks/:id')
  @HttpCode(200)
  @Auth('admin')
  updateDrink(@Param('id') id: string, @Body() dto: CreateFoodDto) {
    return this.foodService.update(id, dto);
  }
}
