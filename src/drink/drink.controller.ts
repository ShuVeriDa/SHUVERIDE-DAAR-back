import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DrinkService } from './drink.service';
import { CreateDrinkDto } from './dto/createDrink.dto';

@Controller('drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get()
  findAll() {
    return this.drinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drinkService.findOne(id);
  }

  @Post()
  create(@Body() createDrinkDto: CreateDrinkDto) {
    return this.drinkService.create(createDrinkDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.drinkService.delete(id);
  }
}
