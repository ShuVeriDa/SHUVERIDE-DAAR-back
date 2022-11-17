import { IsArray, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePizzaDto {
  @IsString()
  imageUrl: string;

  @IsString()
  title: string;

  // @IsArray()
  // types: number;
  //
  // @IsArray()
  // sizes: number;

  @IsNumber()
  price: number;

  @IsNumber()
  category: number;

  @IsNumber()
  rating: number;
}
