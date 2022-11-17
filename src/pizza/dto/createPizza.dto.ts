import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreatePizzaDto {
  @IsNumber()
  id: number;

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
