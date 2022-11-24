import { IsNumber, IsString } from 'class-validator';

export class SetRatingDto {
  @IsString()
  pizzaId: string;

  @IsNumber()
  value: number;
}
