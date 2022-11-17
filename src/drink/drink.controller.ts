import { Body, Controller, Get, Post } from '@nestjs/common';
import { DrinkService } from './drink.service';
import { CreateDrinkDto } from './dto/createDrink.dto';

@Controller('drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get()
  findAll() {
    return this.drinkService.findAll();
  }

  @Post()
  create(@Body() createDrinkDto: CreateDrinkDto) {
    return this.drinkService.create(createDrinkDto);
  }
}
