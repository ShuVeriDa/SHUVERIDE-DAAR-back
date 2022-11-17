import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/createPizza.dto';

@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get()
  findAll() {
    return this.pizzaService.findAll();
  }

  @Post()
  create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzaService.create(createPizzaDto);
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pizzaService.findOne();
  // }
}
