import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../user/decorators/user.decorator';
import { SetRatingDto } from './dto/rating.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UsePipes(new ValidationPipe())
  @Post('set-rating/foods')
  @HttpCode(200)
  @Auth()
  setRating(@User('id') id: string, @Body() dto: SetRatingDto) {
    return this.ratingService.setRating(id, dto);
  }
}
