import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../user/decorators/user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(@Query() query: { foodId?: string }) {
    return this.commentService.findAll(+query.foodId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Auth('admin')
  create(@Body() dto: CreateCommentDto, @User('id') userId: string) {
    return this.commentService.create(dto, userId);
  }
}
