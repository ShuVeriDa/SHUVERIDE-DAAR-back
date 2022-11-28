import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  imageUrl: string;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  kind: number;

  @IsOptional()
  @IsNumber()
  category?: number;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsNumber()
  @IsOptional()
  liters?: number | null;

  @IsArray()
  @IsNumber({ allowNaN: false }, { each: true })
  @IsOptional()
  types?: number[] | null;

  @IsArray()
  @IsNumber({ allowNaN: false }, { each: true })
  @IsOptional()
  sizes?: number[] | null;

  // @IsNumber()
  // favorites: number;
}
