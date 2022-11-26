import { IsNumber, IsString } from 'class-validator';

export class SetRatingDto {
  @IsString()
  foodId: string;

  @IsNumber()
  value: number;
}
