import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../user/decorators/user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CommentEntity } from './entity/comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(@Query() query: { foodId?: string }) {
    return this.commentService.findAll(+query.foodId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Get('food/:id')
  findByFoodId(@Param('id') foodId: string) {
    return this.commentService.findByFoodId(foodId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Auth()
  create(@Body() dto: CreateCommentDto, @User('id') userId: string) {
    return this.commentService.create(dto, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Auth()
  update(
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
    @User('id') userId: string,
  ) {
    return this.commentService.update(id, userId, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Auth()
  remove(@Param('id') id: string, @User('id') userId: string) {
    return this.commentService.remove(id, userId);
  }

  // @Post(':id/favorites')
  // @Auth()
  // async addToFavorites(@User('id') userId: string, @Param('id') id: string) {
  //   return await this.commentService.addToFavorites(id, userId);
  // }

  // @Delete(':id/favorites')
  // @Auth()
  // async deleteFromFavorites(
  //   @User('id') userId: string,
  //   @Param('id') id: string,
  // ) {
  //   return await this.commentService.removeFromFavorites(id, userId);
  // }
}
