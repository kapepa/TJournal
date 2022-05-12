import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DtoArticle } from '../dto/dto.article';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtCheckGuard } from '../auth/jwt-check.guard';

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
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'receive one article',
    type: DtoArticle,
  })
  async receiveOne(@Param() param, @Req() req): Promise<DtoArticle> {
    return await this.articleService.receiveOne('id', param.id, req.user.id);
  }

  @Get('/all')
  @UseGuards(JwtCheckGuard)
  @ApiCreatedResponse({
    description: 'receive all article',
    type: DtoArticle,
  })
  async receiveAll(@Query() query, @Req() req): Promise<DtoArticle[]> {
    const { list, nav, word } = query;
    return await this.articleService.allArticle(list, nav, word, req.user?.id);
  }

  @Get('/search')
  @UseGuards(JwtCheckGuard)
  @ApiCreatedResponse({
    description: 'search article',
    type: DtoArticle,
  })
  async searchArticle(@Query('word') query, @Req() req): Promise<any> {
    return await this.articleService.allArticle(0, 'all', req.user.id, query);
  }

  @Get('/short')
  @UseGuards(JwtCheckGuard)
  @ApiCreatedResponse({
    description: 'short receive all article',
  })
  async short(@Query('list') query): Promise<any> {
    return await this.articleService.shortArticle(query);
  }

  @Put('/update')
  @ApiCreatedResponse({
    description: 'update one article',
    type: DtoArticle,
  })
  async update(@Body() body): Promise<DtoArticle> {
    const { id, ...other } = body;
    return await this.articleService.updateArticle('id', id, other);
  }

  @Put('/likes')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'update likes article',
    type: DtoArticle,
  })
  async likes(@Body() body, @Req() req): Promise<DtoArticle> {
    return await this.articleService.likesArticle(body, req.user.id);
  }

  @Get('/likes/count/:id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'receive likes to article',
  })
  async countLikes(@Param('id') param): Promise<number> {
    const article = await this.articleService.findArticle('id', param);
    return article.likes;
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'Delete article on id',
  })
  async deleteOne(@Query('id') query): Promise<any> {
    return await this.articleService.deleteArticle(query);
  }

  @Put('/exclude')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'do make exclude when take articles',
  })
  async excludeArticle(@Query('id') query, @Req() req): Promise<DtoArticle> {
    return this.articleService.excludeArticle(query, req.user.id);
  }

  @Put('/reset')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'reset all articles',
  })
  async resetArticle(@Req() req): Promise<any> {
    return await this.articleService.resetArticle(req.user.id);
  }
}
