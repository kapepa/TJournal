import {
  Body,
  Controller,
  Get,
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

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: DtoArticle,
  })
  async getList(@Query() query, @Req() req): Promise<DtoArticle[]> {
    const { last } = query;
    return await this.articleService.getList(Number(last));
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'create',
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body): Promise<any> {
    const data = Object.assign({ file: file }, body);
    console.log(data);
    return 'create';
  }
}
