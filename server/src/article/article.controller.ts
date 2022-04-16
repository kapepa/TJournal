import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import DtoArticle from '../dto/dto.article';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Article')
@Controller(`/api/article`)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'create',
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body, @Req() req): Promise<string> {
    const article = Object.assign({}, body);
    return await this.articleService.createArticle(req.user.id, article, file);
  }

  @Get('/one/:id')
  @ApiCreatedResponse({
    description: 'receive one article',
    type: DtoArticle,
  })
  async receiveOne(@Param() param): Promise<DtoArticle> {
    return await this.articleService.findArticle('id', param.id);
  }

  @Get('/all')
  @ApiCreatedResponse({
    description: 'receive all article',
    type: DtoArticle,
  })
  async receiveAll(@Query('list') query): Promise<DtoArticle[]> {
    console.log(query);
    return await this.articleService.allArticle(query);
  }

  @Get('/short')
  @ApiCreatedResponse({
    description: 'short receive all article',
  })
  async short(@Query('list') query): Promise<any> {
    return await this.articleService.shortArticle(query);
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'Delete article on id',
  })
  async deleteOne(@Query('id') query): Promise<any> {
    return await this.articleService.deleteArticle(query);
  }
}
