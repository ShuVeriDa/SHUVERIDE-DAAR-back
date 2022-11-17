import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateDrinkDto {
  @IsString()
  imageUrl: string;

  @IsString()
  title: string;

  @IsNumber()
  liters: number;

  @IsNumber()
  price: number;

  @IsNumber()
  category: number;

  @IsNumber()
  rating: number;
}
